# Deploy Raahsta on Render

This configuration uses a **paid Starter web service and a paid 1 GB persistent disk**.
It keeps the existing Brevo SMTP transport and stores new user/tour images persistently.
Nothing is provisioned until you create and approve the service in Render.

## Before deployment

1. Commit these changes and push to GitHub. Never commit `config.env` or actual secrets.
2. If the app is inside a larger repository, select that app folder as the Blueprint path/root
   as appropriate. The build must run from the folder containing this package.json.
3. In Render, create a Blueprint from the repository and select `render.yaml`.
4. Review the paid service and disk before creating them.
5. Fill the prompted environment variables using `.env.example` as a reference.
   Use the existing MongoDB Atlas database if you want to keep your tours/users/bookings.
   DATABASE can contain `<db_password>` with DATABASE_PASSWORD supplied separately,
   or be a complete connection URI. Escape special characters in URI credentials.
6. Allow Render's outbound addresses/ranges in Atlas Network Access. If Brevo's SMTP
   IP restriction is enabled, configure it for Render's outbound addresses too. If your
   Brevo allowlist cannot accommodate the shared outbound ranges, use dedicated outbound
   IPs or change the SMTP restriction; your home public IP is not the server's IP.
7. Restrict your Mapbox token to the deployed URL if you use URL restrictions.

## Dashboard configuration without a Blueprint

- Runtime: Node; Node version: 24
- Build: `npm ci --include=dev && npm run build:js`
- Start: `npm start`
- Health check: `/health`
- Set NODE_ENV=production and TRUST_PROXY_HOPS=1 for Render's reverse proxy.
- Attach a persistent disk at `/var/data/raahsta`; set UPLOAD_DIR to the same path.
- Add the other environment variables listed in `.env.example`.

The app waits for MongoDB and upload-directory setup before accepting traffic.
`/health` returns 200 when MongoDB is connected and 503 when it is unavailable.
SIGTERM/SIGINT stop new requests and close MongoDB before exiting.

## Upload storage

New uploads live in `UPLOAD_DIR/users` and `UPLOAD_DIR/tours`. Public URLs remain
`/img/users/...` and `/img/tours/...`. Missing uploaded files fall back to bundled
images in `public/img`, so sample images do not need copying to an empty disk.
Local defaults still write to public/img. A persistent disk is tied to one service
instance; use external object storage before scaling to multiple instances.
Uploads made locally that are neither committed nor copied to the disk will not
appear on the hosted app. MongoDB storing a filename does not transfer the image.

## Verify after deployment

1. Open `/health`, `/`, and a tour detail page.
2. Log in and out over HTTPS; open My Account and My Tours.
3. Request a reset email and confirm its link uses the deployed HTTPS hostname.
4. Upload a photo and verify it survives a restart/redeploy.
5. Complete a Razorpay **test** payment and check the booking and My Tours.

Razorpay remains in test mode. Current booking persistence relies on the browser
calling verification; a signed, idempotent webhook is still needed for recovery
when a customer closes their browser after paying. This is a portfolio deployment,
not a switch to accepting real payments.

Render Free cannot use this paid disk configuration and blocks SMTP port 587.
For a free deployment, first migrate email to Brevo's HTTPS API and uploads to
external durable storage; do not simply remove the disk and expect uploads to persist.

Local commands: `npm start` starts once, `npm run start:dev` watches server files,
`npm run watch:js` watches browser assets, and `npm run build:js` builds for release.
