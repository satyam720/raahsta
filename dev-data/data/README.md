# India demo dataset

All tours, prices, departure dates, reviews, users and bookings are **fictional demo
data**. Destinations are real; route coordinates are approximate. This is not a
bookable travel offer or a trip-safety plan. Prices are INR per person and sample
departures are in 2027. The six seed bookings represent fictional paid bookings;
they do not refer to Razorpay transactions or move any money.

- 9 tours across Uttarakhand, Himachal Pradesh, Ladakh, Kerala, Goa, Rajasthan,
  Meghalaya, Karnataka and the Andaman and Nicobar Islands.
- 17 users: 1 admin, 6 guides and 10 travellers. Emails use reserved example domains.
- 36 original mock reviews (4 per tour), with matching rating counts and averages.
- 6 sample bookings linked to the travellers and tours above.

## Generate and validate

`node dev-data/data/create-india-data.js` regenerates the JSON fixtures.
`node scripts/download-india-images.mjs` downloads openly licensed destination
photographs and generates initials-based fictional-user avatars. Attribution is
available at `/photo-credits.html` and in `public/photo-credits.json`. Photographs
are resized/cropped and retain their source license. No real people's photos are
used to represent the fictional users.

`node dev-data/data/import-dev-data.js --validate` validates all records, references
and image paths without connecting to a database.

## Replace a database

`node dev-data/data/import-dev-data.js --replace --database test`

This command **replaces every user, tour, review and booking** in the database
configured by DATABASE in config.env. Supply its actual name after --database;
the importer refuses to mutate a different database. It requires MongoDB
transactions (Atlas supports these). There is no non-transactional fallback.

Before deletion, all four collections are backed up under `.local/backups/` using
MongoDB Extended JSON so ObjectIds, dates and existing password hashes survive.
The backup folder is printed only after successful completion. New user passwords
are random, bcrypt-hashed in MongoDB, and listed in `seed-credentials.json` in that
private backup folder. Never commit or publish these files. The seed admin email
is `admin@raahsta.example`; its password is generated at import time.

To restore a backup:

`node dev-data/data/import-dev-data.js --restore .local/backups/BACKUP_FOLDER --database test`

Restore also backs up the current collections first and runs transactionally.
`--import --database NAME` works only with empty collections. `--delete --database
NAME` backs up and deletes all four collections. Import uses the MongoDB collections
directly after schema validation and password hashing, so it does not send welcome
emails or trigger background review-rating hooks. Aggregated ratings are already
calculated from the seed reviews.

Only the database referenced by local config.env is updated by these commands.
If Render points to a different database, it needs a separate intentional import.
Changing users invalidates sessions for the accounts that were replaced; log in
with a newly generated credential afterwards.
