import User from '../models/userModel.js';
import AppError from '../Utils/appError.js';
import { catchAsync } from '../Utils/catchAsync.js';
import { deleteOne, getAll, getOne, updateOne } from './handlerFactory.js';


const filteredObj = function (obj, ...allowedFields) {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

const updateMe = catchAsync(async (req, res, next) => {
  // 1) create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updatePassword',
        400,
      ),
    );
  }
  // 2) udpate user document
  const filteredBody = filteredObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
        user: updatedUser
    }
  });
});

const deleteMe = catchAsync( async(req,res,next) => {
    await User.findByIdAndUpdate(req.user.id, {active: false});
    res.status(204).json({
        status: 'success',
        data: null
    })
})


const createUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'This route is not defined! Please use /signup instead',
  });
};

const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
}



// do not update passwords with this!
const getUser = getOne(User);
const getAllUsers = getAll(User);
const updateUser = updateOne(User)
const deleteUser = deleteOne(User);

export { getAllUsers, getUser, createUser, updateUser, deleteUser, updateMe, deleteMe, getMe };
