import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});

configDotenv({ path: './config.env', debug: true, encodeing: 'UTF-8' });

const { default: app } = await import('./app.js');

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB);

const port = process.env.PORT || 3000;

const server = app.listen(port);

process.on('unhandledRejection', (err) => {
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
