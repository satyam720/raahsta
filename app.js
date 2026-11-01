import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import sanitizeHtml from 'sanitize-html';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';

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

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.set('query parser', 'extended');

// Global Middleware
// serving static files
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
// security http headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'self'", 'https://api.mapbox.com', 'https://cdn.jsdelivr.net'],
        'connect-src': ["'self'", 'https://*.mapbox.com', 'https://cdn.jsdelivr.net'],
        'img-src': ["'self'", 'data:', 'blob:', 'https://*.mapbox.com' ],
        'worker-src': ["'self'", 'blob:'],
        'child-src': ["'self'", 'blob:'],
      },
    },
  }),
);

// development logging
app.use(morgan('dev'));

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
  console.log(req.cookies);
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

app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.sendStatus(204);
});

app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
