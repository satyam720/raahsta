import express from 'express';
import { getAccount, getLoginForm, getMyTours, getOverviewView, getTourView, updateUserData, } from '../controllers/viewsController.js';
import { isLoggedIn, protect } from '../controllers/authController.js';


const router = express.Router();
router.get('/me', protect, getAccount);
router.post('/submit-user-data', protect,updateUserData);
router.use(isLoggedIn);
router.get('/', getOverviewView);
router.get('/tour/:slug', getTourView);
router.get('/login', getLoginForm);
router.get('/my-tours', protect, getMyTours);


export default router;