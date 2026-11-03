import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import sanitizeHtml from 'sanitize-html';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { uploadRoot, usesCloudinary, cloudinaryImageUrl } from './Utils/uploads.js';

import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import AppError from './Utils/appError.js';
import { globalErrorHandler } from './controllers/errorController.js';

const fileUrl = fileURLToPath(import.meta.url);
const __dirname = dirname(fileUrl);

import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';
import reviewRouter from './routes/reviewRoute.js';
import viewRouter from './routes/viewRoutes.js';
import bookingRouter from './routes/bookingRoute.js'

const app = express();
app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS || 0));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.set('query parser', 'extended');

// Global Middleware
// serving static files
// security http headers
app.use(
  helmet({
    crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'self'", 'https://api.mapbox.com', 'https://cdn.jsdelivr.net', 'https://api.razorpay.com', "https://checkout.razorpay.com", "https://cdn.razorpay.com"],
        'connect-src': [
          "'self'",
          'https://*.mapbox.com',
          'https://cdn.jsdelivr.net',
          'https://api.razorpay.com',
          'https://lumberjack.razorpay.com',
        ],
        'img-src': ["'self'", 'data:', 'blob:', 'https://*.mapbox.com', 'https://res.cloudinary.com' ],
        'worker-src': ["'self'", 'blob:'],
        'child-src': ["'self'", 'blob:'],
        'frame-src': ["'self'", 'https://api.razorpay.com'],
      },
    },
  }),
);

// Uploaded files override bundled images; unchanged sample images still fall back to public.
app.use('/img', express.static(uploadRoot));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/img/:type/:filename', (req, res, next) => {
  if (!usesCloudinary()) return next();
  const url = cloudinaryImageUrl(req.params.type, req.params.filename);
  if (!url) return next();
  return res.redirect(302, url);
});
app.get('/health', (req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({ status: ready ? 'ok' : 'unavailable' });
});

// development logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// limit requests from same api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour!',
});

app.use('/api', limiter);

// body parser, reading data from body into req.body
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(
  express.json({
    limit: '10kb',
  }),
);

// data sanitization against NoSQL query injection and XSS
const sanitizeInput = (req, res, next) => {
  const sanitizeValue = (value) => {
    if (typeof value === 'string') {
      return sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
      });
    }

    if (Array.isArray(value)) {
      return value.map(sanitizeValue);
    }

    if (value && typeof value === 'object') {
      return Object.entries(value).reduce((acc, [key, nestedValue]) => {
        if (key.startsWith('$') || key.includes('.')) {
          return acc;
        }

        acc[key] = sanitizeValue(nestedValue);
        return acc;
      }, {});
    }

    return value;
  };

  req.body = sanitizeValue(req.body);

  Object.defineProperty(req, 'query', {
    value: sanitizeValue(req.query),
    configurable: true,
    writable: true,
  });

  Object.defineProperty(req, 'params', {
    value: sanitizeValue(req.params),
    configurable: true,
    writable: true,
  });

  next();
};

app.use(sanitizeInput);

// prevent paramter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);



// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes

app.get('/api/config', (req, res) => {
  res.json({
    mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
  });
});


app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.sendStatus(204);
});

app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
