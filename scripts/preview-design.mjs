// A local design preview with sample data. No database or real API operations.
import express from 'express';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
export function createDesignPreview() {
  const tours = JSON.parse(fs.readFileSync(path.join(root, 'dev-data/data/tours.json')));
  for (const tour of tours) {
    tour.id = tour._id;
    tour.slug = tour.name.toLowerCase().replaceAll(' ', '-');
    tour.guides = [{ name: 'Aditi Sharma', photo: 'india-user-2.png', role: 'lead-guide' }];
    tour.reviews = [{ user: { name: 'Aarav Patel', photo: 'india-user-8.png' }, rating: 5, review: 'A beautiful way to slow down, get outside, and discover somewhere new.' }];
  }
  const user = { name: 'Satyam Pandey', email: 'satyam@example.com', photo: 'default.jpg', role: 'user' };
  const app = express();
  app.set('views', path.join(root, 'views'));
  app.set('view engine', 'pug');
  app.use(express.static(path.join(root, 'public')));
  app.get('/', (req, res) => res.render('overview', { title: 'All Tours', tours }));
  app.get('/my-tours', (req, res) => res.render('overview', { title: 'My Tours', tours: [], user }));
  app.get('/tour/:slug', (req, res) => res.render('tour', { title: tours[0].name, tour: tours.find(t => t.slug === req.params.slug) || tours[0], user, mapboxAccessToken: '' }));
  for (const [route, view, title] of [['/me', 'account', 'Your Account'], ['/login', 'login', 'Log in'], ['/signup', 'signup', 'Sign up'], ['/error', 'error', 'A little detour']]) {
    app.get(route, (req, res) => res.render(view, { title, user: route === '/me' ? user : undefined, msg: 'We couldn’t find that page. Let’s get you back on the path.' }));
  }
  return app;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PREVIEW_PORT || 4173);
  createDesignPreview().listen(port, '127.0.0.1', () => process.stdout.write(`Design preview: http://127.0.0.1:${port}\nSample data only; payment and account actions are unavailable.\n`));
}
