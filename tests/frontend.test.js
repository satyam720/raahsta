import { test } from 'node:test';
import assert from 'node:assert/strict';
import pug from 'pug';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const tours = JSON.parse(readFileSync(new URL('../dev-data/data/tours.json', import.meta.url)));
for (const tour of tours) {
  tour.id = tour._id;
  tour.slug = tour.name.toLowerCase().replaceAll(' ', '-');
  tour.guides = [];
  tour.reviews = [];
}
const user = { name: 'Test Explorer', email: 'test@example.com', photo: 'default.jpg', role: 'user' };
const render = (view, locals = {}) => pug.renderFile(fileURLToPath(new URL(`../views/${view}.pug`, import.meta.url)), { title: 'All Tours', tours, user: undefined, ...locals });

test('overview renders real tour links, INR prices and filter metadata', () => {
  const html = render('overview');
  assert.ok(html.includes(`/tour/${tours[0].slug}`));
  assert.ok(html.includes(`data-duration="${tours[0].duration}"`));
  assert.ok(html.includes('₹'));
  assert.ok(html.includes('id="tour-search"'));
  assert.ok(html.includes('id="filter-empty" hidden'));
});

test('My Tours has a useful empty state without the home marketing hero', () => {
  const html = render('overview', { title: 'My Tours', tours: [], user });
  assert.ok(html.includes('Your first adventure is waiting.'));
  assert.ok(!html.includes('id="hero-title"'));
});

test('auth and account forms retain the existing JavaScript hooks', () => {
  const login = render('login');
  assert.match(login, /form--login/);
  for (const id of ['email', 'password']) assert.ok(login.includes(`id="${id}"`));
  const signup = render('signup');
  for (const id of ['userSignUp', 'name', 'email', 'password', 'confirmpassword']) assert.ok(signup.includes(`id="${id}"`));
  const account = render('account', { user });
  for (const hook of ['form-user-data', 'form-user-password', 'btn--save-password', 'nav__el--logout']) assert.ok(account.includes(hook));
  assert.ok(account.includes('/img/users/default.jpg'));
});

test('tour booking remains bound to the correct tour and requires login', () => {
  const locals = { tour: tours[0], mapboxAccessToken: '' };
  const authenticated = render('tour', { ...locals, user });
  assert.ok(authenticated.includes('id="book-tour"'));
  assert.ok(authenticated.includes(`data-tour-id="${tours[0].id}"`));
  const guest = render('tour', locals);
  assert.ok(!guest.includes('id="book-tour"'));
  assert.ok(guest.includes('Log in to book'));
});

test('all pages share theme controls, a skip link and a main landmark', () => {
  for (const view of ['overview', 'tour', 'login', 'signup', 'account', 'error']) {
    const html = render(view, { user, tour: tours[0], mapboxAccessToken: '', msg: 'Test error' });
    for (const hook of ['lang="en"', 'class="skip-link"', 'id="main-content"', '/js/theme-init.js', 'class="theme-toggle"']) assert.ok(html.includes(hook), `${view}: ${hook}`);
  }
});
