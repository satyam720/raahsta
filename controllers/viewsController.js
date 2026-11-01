import Tour from '../models/tourModels.js';
import User from '../models/userModel.js';
import AppError from '../Utils/appError.js';
import { catchAsync } from '../Utils/catchAsync.js';

export const getOverviewView = catchAsync(async function (req, res, next) {
  // 1) get tour data from collection
  const tours = await Tour.find();
  // 2) build template
  // 3) rendere template using tour data from step1
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

export const getTourView = catchAsync(async function (req, res, next) {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review ratings user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
    mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
  });
});

export const getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your acount',
  });
};

export const getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account',
  });
};

export const updateUserData = async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).render('account', {
    title: 'Your Account',
    user: updatedUser
  });
};
