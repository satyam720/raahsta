import { promisify } from 'util';
import crypto from 'crypto';
import User from '../models/userModel.js';
import AppError from '../Utils/appError.js';
import { catchAsync } from '../Utils/catchAsync.js';
import jwt from 'jsonwebtoken';
import Email from '../Utils/email.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
});

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptoins = {
    ...getCookieOptions(),
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
  };

  res.cookie('jwt', token, cookieOptoins);
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  const url = `${req.protocol}://${req.get('host')}/me`;
  console.log(url);
  await new Email(newUser, url).sendWelcome();
  createSendToken(newUser, 201, res);
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) if email and password actually exist
  if (!email || !password) {
    return next(new AppError('Email or password is missing', 400));
  }
  // 2) check if the user exists and at the same time if pasword is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) if everything is okay, send the token to client
  createSendToken(user, 200, res);
});

const protect = catchAsync(async (req, res, next) => {
  // 1) getting token and check it its' there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401),
    );
  }
  // 2) verification of the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // 3) check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist',
        401,
      ),
    );
  }
  // 4) check if user changed password after the token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please login again', 401),
    );
  }

  req.user = freshUser;
  res.locals.user = freshUser;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };
};

const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address!', 404));
  }

  // 2) generate the random token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) send it back as an email
  try {
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    console.log(resetURL, ":::::::::")
    await new Email(user, resetURL).sendPasswordRest();
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.error('Email failed:', error.code, error.response);
    return next(
      new AppError(
        'there was an error sending the email, Try again later!',
        500,
      ),
    );
  }
});
const resetPassword = catchAsync(async (req, res, next) => {
  // 1) get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  // 2)if token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or expired!', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();
  // 3) udpate changedPasswordAt property for the user

  // 4) Log the user in, send JWT
  createSendToken(user, 201, res);
});

const updatePassword = catchAsync(async (req, res, next) => {
  //1) get the user from collection
  const user = await User.findById(req.user.id).select('+password');
  console.log(user);
  //2) check if posted password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(
      new AppError('Invalid current password! please try again', 401),
    );
  }
  //3) if the password is correct then updated the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //4) log user in, send JWT
  createSendToken(user, 200, res);
});

// only for rendered pages, no errors!
const isLoggedIn = catchAsync(async (req, res, next) => {
  // 1) getting token and check it its' there

  let token = req.cookies?.jwt;
  if (!token) {
    return next();
  }
  if (token === 'loggedout') {
    res.clearCookie('jwt', getCookieOptions());
    return next();
  }
  // 2) verification of the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // 3) check if user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next();
  }
  // 4) check if user changed password after the token was issued
  if (user.changedPasswordAfter(decoded.iat)) {
    return next();
  }

  // There is a logged in user
  res.locals.user = user;
  next();
});

const logout = (req, res) => {
  res.clearCookie('jwt', getCookieOptions());
  res.status(200).json({ status: 'success' });
};

export {
  signup,
  login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
  isLoggedIn,
  logout
};
