import express from 'express';
import {protect} from '../controllers/authController.js';
import { getCheckoutSession, verifyPayment } from '../controllers/bookingController.js';
const router = express.Router();

router.route('/checkout-session/:tourID').get(protect, getCheckoutSession);
router.post('/verify-payment', protect, verifyPayment);

export default router;
