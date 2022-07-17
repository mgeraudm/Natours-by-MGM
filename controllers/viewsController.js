const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking') res.locals.alert = 'Your booking was successful!';
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  //get tour data from DB
  const tours = await Tour.find();

  //build template (pug)

  //render that template with DB tour data
  res.status(200).render('overview', { tours: tours });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });
  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }
  res.status(200).render('Tour', { title: `${tour.name} Tour`, tour });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('Login', { title: 'login' });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', { title: 'Your Account' });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  //find all users' bookings
  const bookings = await Booking.find({ user: req.user.id });
  //console.log(bookings);

  //find tours with returned Ids
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });
  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    { new: true, runValidators: true }
  );
  res
    .status(200)
    .render('account', { title: 'Your Account', user: updatedUser });
});
