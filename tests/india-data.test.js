import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { buildIndiaData } from '../dev-data/data/create-india-data.js';
import Tour from '../models/tourModels.js';
import Review from '../models/reviewModel.js';
import Booking from '../models/bookingModel.js';

const data = buildIndiaData();
test('India seed has valid schemas, linked identities and matching review averages', async () => {
  const users = new Set(data.users.map(user => user._id));
  const tours = new Map(data.tours.map(tour => [tour._id, tour]));
  assert.equal(tours.size, 9);
  const pairs = new Set();
  for (const tour of data.tours) {
    await new Tour(tour).validate();
    assert.ok(tour.price >= 8000 && tour.price < 50000);
    assert.ok(tour.startLocation.address.endsWith('India'));
    for (const place of [tour.startLocation, ...tour.locations]) {
      const [longitude, latitude] = place.coordinates;
      assert.ok(longitude >= 68 && longitude <= 98);
      assert.ok(latitude >= 6 && latitude <= 37);
    }
    for (const guide of tour.guides) assert.ok(users.has(guide));
    const reviews = data.reviews.filter(review => review.tour === tour._id);
    assert.equal(tour.ratingsQuantity, reviews.length);
    assert.equal(tour.ratingsAverage, Math.round(reviews.reduce((total, review) => total + review.rating, 0) / reviews.length * 10) / 10);
    for (const date of tour.startDates) assert.ok(new Date(date) >= new Date('2027-01-01'));
  }
  for (const review of data.reviews) {
    await new Review(review).validate();
    assert.ok(users.has(review.user) && tours.has(review.tour));
    const pair = `${review.user}:${review.tour}`;
    assert.ok(!pairs.has(pair)); pairs.add(pair);
  }
  for (const booking of data.bookings) {
    await new Booking(booking).validate();
    assert.ok(users.has(booking.user));
    assert.equal(booking.price, tours.get(booking.tour).price);
    assert.equal(booking.currency, 'INR');
    assert.equal(booking.razorpayPaymentId, undefined);
  }
});

test('checked-in fixtures match the generator and do not contain reusable passwords', () => {
  for (const collection of Object.keys(data)) {
    const actual = JSON.parse(readFileSync(new URL(`../dev-data/data/${collection}.json`, import.meta.url)));
    assert.deepEqual(actual, data[collection]);
  }
  for (const user of data.users) assert.equal(user.password, undefined);
});

test('every India tour and user has local image assets with photo credits', () => {
  const credits = JSON.parse(readFileSync(new URL('../public/photo-credits.json', import.meta.url)));
  for (const tour of data.tours) for (const file of [tour.imageCover, ...tour.images]) {
    assert.ok(existsSync(new URL(`../public/img/tours/${file}`, import.meta.url)), file);
    assert.ok(credits.some(credit => credit.file === file && credit.source && credit.licenseUrl));
  }
  for (const user of data.users) assert.ok(existsSync(new URL(`../public/img/users/${user.photo}`, import.meta.url)));
});
