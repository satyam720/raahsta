import express from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBooking,
  getCheckoutSession,
  updateBooking,
  verifyPayment,
} from '../controllers/bookingController.js';
const router = express.Router();
router.use(protect);
router.route('/checkout-session/:tourID').get(getCheckoutSession);
router.post('/verify-payment', verifyPayment);
router.use(restrictTo('admin', 'lead-guid'));
router.route('/').get(getAllBookings).post(createBooking);
router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);

export default router;
