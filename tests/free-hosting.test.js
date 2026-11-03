import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import Email from '../Utils/email.js';
import { saveImage, cloudinaryImageUrl, usesCloudinary } from '../Utils/uploads.js';

test('free hosting uses authenticated HTTPS services', async t => {
  process.env.NODE_ENV = 'production';
  process.env.BREVO_API_KEY = 'test-api-key';
  process.env.EMAIL_FROM = 'sender@example.com';
  process.env.UPLOAD_STORAGE = 'cloudinary';
  process.env.CLOUDINARY_CLOUD_NAME = 'test-cloud';
  process.env.CLOUDINARY_API_KEY = 'test-cloud-key';
  process.env.CLOUDINARY_API_SECRET = 'test-cloud-secret';

  await t.test('welcome email sends rendered HTML and plain text through Brevo', async t => {
    t.mock.method(globalThis, 'fetch', async (url, options) => {
      assert.equal(url, 'https://api.brevo.com/v3/smtp/email');
      assert.equal(options.headers['api-key'], 'test-api-key');
      const body = JSON.parse(options.body);
      assert.equal(body.sender.email, 'sender@example.com');
      assert.deepEqual(body.to, [{ email: 'recipient@example.com' }]);
      assert.match(body.htmlContent, /Raahsta/);
      assert.match(body.textContent, /Raahsta/);
      return { ok: true };
    });
    await new Email({ name: 'Test User', email: 'recipient@example.com' }, 'https://example.com/me').sendWelcome();
    assert.equal(globalThis.fetch.mock.callCount(), 1);
  });

  await t.test('Brevo failure rejects without disclosing the API key', async t => {
    t.mock.method(globalThis, 'fetch', async () => ({ ok: false, status: 401 }));
    await assert.rejects(
      new Email({ name: 'Test User', email: 'recipient@example.com' }, 'https://example.com').sendPasswordRest(),
      /Brevo email request failed \(HTTP 401\)/,
    );
  });

  await t.test('Cloudinary upload is signed and preserves its delivery filename', async t => {
    const bytes = Buffer.from('test-image-buffer');
    t.mock.method(globalThis, 'fetch', async (url, options) => {
      assert.equal(url, 'https://api.cloudinary.com/v1_1/test-cloud/image/upload');
      const form = options.body;
      const id = form.get('public_id');
      assert.equal(id, 'raahsta/users/user-abc-123');
      assert.equal(form.get('api_key'), 'test-cloud-key');
      assert.equal(form.get('signature'), createHash('sha256')
        .update(`public_id=${id}&timestamp=${form.get('timestamp')}test-cloud-secret`).digest('hex'));
      assert.deepEqual(Buffer.from(await form.get('file').arrayBuffer()), bytes);
      return { ok: true };
    });
    assert.equal(usesCloudinary(), true);
    await saveImage(bytes, 'users', 'user-abc-123.jpeg');
    assert.equal(cloudinaryImageUrl('users', 'user-abc-123.jpeg'),
      'https://res.cloudinary.com/test-cloud/image/upload/raahsta/users/user-abc-123.jpg');
    assert.equal(cloudinaryImageUrl('users', '../secret'), null);
  });

  await t.test('failed storage upload does not report success', async t => {
    t.mock.method(globalThis, 'fetch', async () => ({ ok: false, status: 403 }));
    await assert.rejects(saveImage(Buffer.from('image'), 'tours', 'tour-abc-123-cover.jpeg'), /Image storage upload failed/);
  });
});
