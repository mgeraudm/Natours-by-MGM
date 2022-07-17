const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
//const bookingController = require('./../controllers/bookingController');

const router = express.Router();

router.get('/me', authController.protect, viewsController.getAccount);

router.use(authController.isLoggedIn);
router.use(viewsController.alerts);

router.get(
  '/',
  //bookingController.createBookingCheckout,
  viewsController.getOverview
);

router.get(
  '/tour/:slug',
  //authController.protect,
  viewsController.getTour
);
router.get('/login', viewsController.getLoginForm);
router.get('/my-tours', viewsController.getMyTours);

module.exports = router;
