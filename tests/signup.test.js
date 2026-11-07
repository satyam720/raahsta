import { test } from 'node:test';
import assert from 'node:assert/strict';
import User from '../models/userModel.js';
import Email from '../Utils/email.js';
import { signup } from '../controllers/authController.js';
import { globalErrorHandler } from '../controllers/errorController.js';

const credentials = { name: 'Test User', email: 'test@example.com', password: 'password123', passwordConfirm: 'password123' };

function submit(body) {
  return new Promise(resolve => {
    const res = {
      cookie(name, value, options) { this.cookieDetails = { name, value, options }; },
      status(code) { this.code = code; return this; },
      json(data) { resolve({ code: this.code, data, cookie: this.cookieDetails }); },
    };
    signup({ body, protocol: 'https', get: () => 'example.com' }, res, error => resolve({ error }));
  });
}

test('signup validation and account creation', async t => {
  process.env.NODE_ENV = 'production';
  process.env.JWT_SECRET = 'local-test-secret';
  process.env.JWT_EXPIRES_IN = '1h';
  process.env.JWT_COOKIE_EXPIRES_IN = '1';

  await t.test('short passwords and mismatched confirmation fail schema validation', async () => {
    await assert.rejects(new User({ ...credentials, password: 'short', passwordConfirm: 'short' }).validate(), /at least 8/);
    await assert.rejects(new User({ ...credentials, passwordConfirm: 'different123' }).validate(), /Passwords are not the same/);
  });

  await t.test('privileged fields are ignored and a regular user receives a login cookie', async t => {
    let created;
    t.mock.method(User, 'create', async data => {
      assert.equal(Object.hasOwn(data, 'role'), false);
      assert.equal(Object.hasOwn(data, 'passwordChangedAt'), false);
      created = new User(data);
      await created.validate();
      return created;
    });
    t.mock.method(Email.prototype, 'sendWelcome', async () => {});
    const result = await submit({ ...credentials, role: 'admin', passwordChangedAt: '2099-01-01' });
    assert.equal(result.code, 201);
    assert.equal(created.role, 'user');
    assert.equal(result.cookie.name, 'jwt');
    assert.equal(result.cookie.options.httpOnly, true);
    assert.equal(result.cookie.options.secure, true);
    assert.equal(result.data.data.user.password, undefined);
  });

  await t.test('welcome email failure does not turn a created account into a failed signup', async t => {
    t.mock.method(User, 'create', async data => new User(data));
    t.mock.method(Email.prototype, 'sendWelcome', async () => { throw new Error('mock email failure'); });
    t.mock.method(console, 'error', () => {});
    const result = await submit(credentials);
    assert.equal(result.code, 201);
    assert.equal(result.data.status, 'success');
    assert.ok(result.cookie.value);
  });

  await t.test('duplicate email is reported safely across MongoDB error shapes', () => {
    for (const details of [{ keyValue: { email: credentials.email } }, { errorResponse: { keyValue: { email: credentials.email } } }, {}]) {
      let code;
      let payload;
      globalErrorHandler({ code: 11000, ...details }, { originalUrl: '/api/v1/users/signup' }, {
        status(value) { code = value; return this; },
        json(value) { payload = value; },
      }, () => {});
      assert.equal(code, 400);
      assert.match(payload.message, /already/);
      assert.equal(payload.message.includes(credentials.email), false);
    }
  });
});
