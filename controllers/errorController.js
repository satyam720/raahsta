import AppError from '../Utils/appError.js';

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  // operational, trusted error: send Message to client
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });

      // Programming or other unknown error: don't leak error details
    } else {
      // 1) log error
      console.error('ERROR', err);

      // 2) send generic message
      return res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
      });
    }
  } else {
    if (err.isOperational) {
      return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: err.message,
      });

      // Programming or other unknown error: don't leak error details
    } else {
      // 1) log error
      console.error('ERROR', err);

      // 2) send generic message
      return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: 'Please try again later',
      });
    }
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const fields = Object.keys(err.keyValue || err.errorResponse?.keyValue || err.keyPattern || {});
  const message = fields.includes('email')
    ? 'An account with this email already exists. Please log in or use another email.'
    : 'This value is already in use. Please use another value.';
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((val) => val.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError('invalid token. Please login again', 401);
const handleJWTExipiredError = (err) =>
  new AppError('Your token has expired, please login again', 401);

export const globalErrorHandler = function (err, req, res, next) {
  console.error(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
    }

    if (err.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }

    if (err.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }

    if ((err.name === 'JsonWebTokenError')) {
      error = handleJWTError(error);
    }

    if (err.name === 'TokenExpiredError') {
      error = handleJWTExipiredError(error);
    }

    sendErrorProd(error, req, res);
  }
};
