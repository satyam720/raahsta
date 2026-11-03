import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import mongoose from 'mongoose';
import sharp from 'sharp';

test('hosting readiness and persistent image storage', async (t) => {
  const directory = await mkdtemp(path.join(tmpdir(), 'raahsta-hosting-'));
  process.env.UPLOAD_DIR = directory;
  process.env.UPLOAD_STORAGE = 'local';
  process.env.TRUST_PROXY_HOPS = '1';
  const { default: app } = await import('../app.js');
  const { uploadPath, prepareUploadDirectories } = await import('../Utils/uploads.js');
  const { resizeUserPhoto } = await import('../controllers/userController.js');
  const { resizeTourImages } = await import('../controllers/tourController.js');
  await prepareUploadDirectories();
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const originalState = mongoose.connection._readyState;
  t.after(async () => {
    mongoose.connection._readyState = originalState;
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    // Only remove the unique temporary directory created by this test.
    await rm(directory, { recursive: true, force: true });
  });

  await t.test('health reflects database readiness without making database requests', async () => {
    mongoose.connection._readyState = 0;
    assert.equal((await fetch(`${base}/health`)).status, 503);
    mongoose.connection._readyState = 1;
    assert.equal((await fetch(`${base}/health`)).status, 200);
  });

  await t.test('trusts only the configured proxy hop', () => {
    const trust = app.get('trust proxy fn');
    assert.equal(trust('127.0.0.1', 0), true);
    assert.equal(trust('127.0.0.1', 1), false);
  });

  await t.test('global CORS handles preflight for root and API paths', async () => {
    for (const route of ['/', '/api/v1/bookings/verify-payment']) {
      const response = await fetch(`${base}${route}`, {
        method: 'OPTIONS',
        headers: {
          Origin: 'https://example.com',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'content-type',
        },
      });
      assert.equal(response.status, 204);
      assert.equal(response.headers.get('access-control-allow-origin'), '*');
      assert.match(response.headers.get('access-control-allow-methods'), /POST/);
      assert.equal(response.headers.get('access-control-allow-headers'), 'content-type');
    }
  });

  await t.test('photo processing writes to upload storage and serves the existing URL', async () => {
    const buffer = await sharp({ create: { width: 4, height: 4, channels: 3, background: '#28a879' } }).png().toBuffer();
    const req = { file: { buffer }, user: { id: 'hosting-test' } };
    await new Promise((resolve, reject) => resizeUserPhoto(req, {}, err => err ? reject(err) : resolve()));
    const bytes = await readFile(uploadPath('users', req.file.filename));
    assert.equal((await sharp(bytes).metadata()).width, 500);
    const response = await fetch(`${base}/img/users/${req.file.filename}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /image\/jpeg/);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), bytes);
  });

  await t.test('empty persistent storage falls back to bundled images with security headers', async () => {
    const response = await fetch(`${base}/img/raahsta-green.svg`);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('cross-origin-opener-policy'), 'same-origin-allow-popups');
    assert.ok(response.headers.get('content-security-policy'));
  });

  await t.test('tour processing safely skips a request without uploaded files', async () => {
    await new Promise((resolve, reject) => resizeTourImages({}, {}, err => err ? reject(err) : resolve()));
  });

  await t.test('cloud images redirect externally while bundled images still load locally', async () => {
    process.env.UPLOAD_STORAGE = 'cloudinary';
    process.env.CLOUDINARY_CLOUD_NAME = 'hosting-test';
    try {
      const response = await fetch(`${base}/img/tours/tour-abc-123-cover.jpeg`, { redirect: 'manual' });
      assert.equal(response.status, 302);
      assert.equal(response.headers.get('location'), 'https://res.cloudinary.com/hosting-test/image/upload/raahsta/tours/tour-abc-123-cover.jpg');
      assert.match(response.headers.get('content-security-policy'), /https:\/\/res.cloudinary.com/);
      assert.equal((await fetch(`${base}/img/raahsta-green.svg`)).status, 200);
    } finally {
      process.env.UPLOAD_STORAGE = 'local';
    }
  });
});
