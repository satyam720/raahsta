import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';
import bcrypt from 'bcryptjs';
import Tour from '../../models/tourModels.js';
import Review from '../../models/reviewModel.js';
import User from '../../models/userModel.js';
import Booking from '../../models/bookingModel.js';

const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(directory, '../..');
const models = { users: User, tours: Tour, reviews: Review, bookings: Booking };
const collections = ['bookings', 'reviews', 'tours', 'users'];

export async function prepareSeed() {
  const data = {};
  for (const name of Object.keys(models)) data[name] = JSON.parse(await readFile(path.join(directory, `${name}.json`), 'utf8'));
  const userIds = new Set(data.users.map(user => user._id));
  const tourIds = new Set(data.tours.map(tour => tour._id));
  const pairs = new Set();
  for (const tour of data.tours) {
    for (const guide of tour.guides) {
      if (!data.users.some(user => user._id === guide && ['guide', 'lead-guide'].includes(user.role))) throw new Error(`Invalid guide reference in ${tour.name}`);
    }
    for (const filename of [tour.imageCover, ...tour.images]) await access(path.join(root, 'public/img/tours', filename), constants.R_OK);
  }
  for (const review of data.reviews) {
    const key = `${review.tour}:${review.user}`;
    if (!tourIds.has(review.tour) || !userIds.has(review.user) || pairs.has(key)) throw new Error('Invalid or duplicate review reference');
    pairs.add(key);
  }
  for (const booking of data.bookings) {
    if (!tourIds.has(booking.tour) || !userIds.has(booking.user)) throw new Error('Invalid booking reference');
  }
  const credentials = [];
  for (const name of Object.keys(models)) {
    data[name] = await Promise.all(data[name].map(async record => {
      let password;
      if (name === 'users') {
        password = randomBytes(18).toString('base64url');
        credentials.push({ email: record.email, name: record.name, role: record.role, password });
        await access(path.join(root, 'public/img/users', record.photo), constants.R_OK);
      }
      const document = new models[name](name === 'users' ? { ...record, password, passwordConfirm: password } : record);
      await document.validate();
      const object = document.toObject({ virtuals: false });
      if (name === 'users') {
        object.password = await bcrypt.hash(password, 12);
        delete object.passwordConfirm;
      }
      return object;
    }));
  }
  return { data, credentials };
}

async function main() {
  configDotenv({ path: path.join(root, 'config.env'), quiet: true });
  const args = process.argv.slice(2);
  const action = args[0];
  if (!['--validate', '--replace', '--import', '--delete', '--restore'].includes(action)) {
    throw new Error('Usage: node dev-data/data/import-dev-data.js --validate | (--replace|--import|--delete|--restore BACKUP_DIRECTORY) --database DATABASE_NAME');
  }
  let prepared;
  if (['--validate', '--replace', '--import'].includes(action)) prepared = await prepareSeed();
  if (action === '--validate') {
    process.stdout.write(`Validated mock data and image references: ${JSON.stringify(Object.fromEntries(Object.entries(prepared.data).map(([key, records]) => [key, records.length])))}\n`);
    return;
  }
  const databaseFlag = args.indexOf('--database');
  const expectedDatabase = databaseFlag >= 0 ? args[databaseFlag + 1] : undefined;
  if (!expectedDatabase) throw new Error('Mutating commands require --database DATABASE_NAME to check the target explicitly');
  if (!process.env.DATABASE) throw new Error('DATABASE is not configured');
  await mongoose.connect(process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD || ''), { serverSelectionTimeoutMS: 15000 });
  if (mongoose.connection.name !== expectedDatabase) throw new Error('Connected database does not match --database; no changes made');
  const db = mongoose.connection.db;
  const ejson = mongoose.mongo.BSON.EJSON;
  let replacement = prepared?.data;
  if (action === '--restore') {
    const restoreDirectory = args[1];
    if (!restoreDirectory || restoreDirectory.startsWith('--')) throw new Error('Supply a backup directory after --restore');
    replacement = {};
    for (const name of collections) replacement[name] = ejson.parse(await readFile(path.join(restoreDirectory, `${name}.json`), 'utf8'));
  }
  // Ensure collections/indexes exist before entering the replacement transaction.
  await Promise.all(Object.values(models).map(model => model.init()));
  const backupDirectory = path.join(root, '.local/backups', `${new Date().toISOString().replace(/[:.]/g, '-')}-${expectedDatabase}-${process.pid}`);
  await mkdir(backupDirectory, { recursive: true, mode: 0o700 });
  const session = await mongoose.startSession();
  let previousCounts;
  try {
    await session.withTransaction(async () => {
      previousCounts = {};
      for (const name of collections) {
        const documents = await db.collection(name).find({}, { session }).toArray();
        previousCounts[name] = documents.length;
        await writeFile(path.join(backupDirectory, `${name}.json`), ejson.stringify(documents, null, 2), { mode: 0o600 });
      }
      await writeFile(path.join(backupDirectory, 'metadata.json'), JSON.stringify({ database: expectedDatabase, timestamp: new Date().toISOString(), action, counts: previousCounts }, null, 2), { mode: 0o600 });
      if (action === '--import' && Object.values(previousCounts).some(count => count > 0)) throw new Error('Import requires empty collections; use --replace for an intentional replacement');
      if (prepared) await writeFile(path.join(backupDirectory, 'seed-credentials.json'), JSON.stringify(prepared.credentials, null, 2), { mode: 0o600 });
      // Backup is fully written before any deletion. Atlas transactions roll back a failed replacement.
      if (action !== '--import') for (const name of collections) await db.collection(name).deleteMany({}, { session });
      if (replacement) for (const name of ['users', 'tours', 'reviews', 'bookings']) {
        if (replacement[name].length) await db.collection(name).insertMany(replacement[name], { session });
      }
    });
  } finally { await session.endSession(); }
  const counts = {};
  for (const name of collections) counts[name] = await db.collection(name).countDocuments();
  process.stdout.write(JSON.stringify({ database: expectedDatabase, previousCounts, counts, backupDirectory, credentialsFile: prepared ? path.join(backupDirectory, 'seed-credentials.json') : undefined }, null, 2) + '\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { await main(); } catch (error) { console.error(`Seed operation failed: ${error.message}`); process.exitCode = 1; }
  finally { await mongoose.disconnect(); }
}
