import AppError from '../Utils/appError.js';
import { catchAsync } from '../Utils/catchAsync.js';
import Tour from '../models/tourModels.js';
import Booking from '../models/bookingModel.js';
import Razorpay from 'razorpay';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { createOne, getAll, getOne, deleteOne, updateOne } from './handlerFactory.js';

const initRazorPay = function () {
  return new Razorpay({
    key_id: `${process.env.RAZORPAY_TEST_KEY_ID}`,
    key_secret: `${process.env.RAZORPAY_TEST_KEY_SECRET}`,
  });
};

export const getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) get the currently booked tour
  const tour = await Tour.findById(req.params.tourID);
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  // 2) create a checkout session
  const instance = initRazorPay();
  const order = await instance.orders.create({
    amount: Math.round(tour.price * 100),
    currency: 'INR',
    receipt: `tour_${Date.now()}`,
    notes: {
      tourId: tour.id,
      userId: req.user.id,
    },
  });

  //3) send to client
  res.status(200).json({
    status: 'success',
    order,
    key: process.env.RAZORPAY_TEST_KEY_ID,
    customer: {
      name: req.user.name,
      email: req.user.email,
    },
    tour: {
      name: tour.name,
      slug: tour.slug,
    },
  });
});

export const verifyPayment = catchAsync(async (req, res, next) => {
  const {
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
  } = req.body || {};

  if (
    typeof orderId !== 'string' || !/^order_[a-zA-Z0-9]+$/.test(orderId) ||
    typeof paymentId !== 'string' || !/^pay_[a-zA-Z0-9]+$/.test(paymentId) ||
    typeof signature !== 'string' || !/^[a-fA-F0-9]{64}$/.test(signature)
  ) {
    return next(new AppError('Valid order ID, payment ID and signature are required', 400));
  }

  const instance = initRazorPay();
  // Fetch the server-created order rather than trusting client amounts or user IDs.
  const order = await instance.orders.fetch(orderId);
  if (order.notes?.userId !== req.user.id) {
    return next(new AppError('This payment order does not belong to you', 403));
  }

  const expectedSignature = createHmac('sha256', process.env.RAZORPAY_TEST_KEY_SECRET)
    .update(`${order.id}|${paymentId}`)
    .digest();
  if (!timingSafeEqual(expectedSignature, Buffer.from(signature, 'hex'))) {
    return next(new AppError('Invalid payment signature', 400));
  }

  const payment = await instance.payments.fetch(paymentId);
  if (
    payment.order_id !== order.id ||
    payment.amount !== order.amount ||
    payment.currency !== order.currency
  ) {
    return next(new AppError('Payment does not match the order', 400));
  }
  if (payment.status !== 'captured') {
    return next(new AppError('Payment has not been captured yet. Please check again shortly.', 409));
  }

  // Use the verified order's metadata and price, never client-supplied booking data.
  // A unique order ID and insert-only update make repeated verification idempotent.
  try {
    await Booking.updateOne(
      { razorpayOrderId: order.id },
      {
        $setOnInsert: {
          tour: order.notes.tourId,
          user: req.user.id,
          price: order.amount / 100,
          currency: order.currency,
          paid: true,
          razorpayOrderId: order.id,
          razorpayPaymentId: payment.id,
        },
      },
      { upsert: true, runValidators: true },
    );
  } catch (error) {
    // Concurrent requests may both try to insert the same order.
    if (error.code !== 11000) throw error;
    const existing = await Booking.exists({
      razorpayOrderId: order.id,
      razorpayPaymentId: payment.id,
      user: req.user.id,
    });
    if (!existing) throw error;
  }
  const booking = await Booking.findOne({ razorpayOrderId: order.id });

  res.status(200).json({
    status: 'success',
    message: 'Payment verified successfully',
    data: { booking, orderId: order.id, paymentId: payment.id, tourId: order.notes.tourId },
  });
});

export const getAllBookings = getAll(Booking);
export const getBooking = getOne(Booking);
export const createBooking = createOne(Booking);
export const updateBooking = updateOne(Booking);
export const deleteBooking = deleteOne(Booking);
