import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});

configDotenv({ path: './config.env', quiet: true, encoding: 'UTF-8' });
process.env.NODE_ENV ||= 'development';

const required = ['DATABASE', 'JWT_SECRET', 'JWT_EXPIRES_IN', 'JWT_COOKIE_EXPIRES_IN'];
if (process.env.DATABASE?.includes('<db_password>')) required.push('DATABASE_PASSWORD');
if (process.env.NODE_ENV === 'production') {
  required.push('EMAIL_FROM', 'BREVO_HOST', 'BREVO_PORT', 'BREVO_LOGIN', 'BREVO_PASSWORD',
    'RAZORPAY_TEST_KEY_ID', 'RAZORPAY_TEST_KEY_SECRET', 'MAPBOX_ACCESS_TOKEN');
}
const missing = required.filter(key => !process.env[key]?.trim());
if (missing.length) throw new Error(`Missing environment variables: ${missing.join(', ')}`);
const proxyHops = Number(process.env.TRUST_PROXY_HOPS || 0);
if (!Number.isInteger(proxyHops) || proxyHops < 0) {
  throw new Error('TRUST_PROXY_HOPS must be a non-negative integer');
}

const { default: app } = await import('./app.js');

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD || '',
);
const { prepareUploadDirectories } = await import('./Utils/uploads.js');
await prepareUploadDirectories();
await mongoose.connect(DB, { serverSelectionTimeoutMS: 10000 });

const port = process.env.PORT || 3000;

const server = app.listen(port, '0.0.0.0');

let shuttingDown = false;
const shutdown = (exitCode) => {
  if (shuttingDown) return;
  shuttingDown = true;
  const timeout = setTimeout(() => process.exit(1), 10000);
  timeout.unref();
  server.close(async () => {
    try {
      await mongoose.disconnect();
      process.exit(exitCode);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });
};
process.on('SIGTERM', () => shutdown(0));
process.on('SIGINT', () => shutdown(0));

process.on('unhandledRejection', (err) => {
  console.error(err.name, err.message);
  shutdown(1);
});
