const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

dotenv.config({ path: './config.env' });

const app = require('../../app');

////////////////////////////////////
// to run & delete from console: node dev-data\data\import-json-into-db.js --delete
// to run & import JSON from console: node dev-data\data\import-json-into-db.js --import
//
//const { errorMonitor } = require('events');

//Linkup mongoDB with Mongoose
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log(`DB connection successful`);
  });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

const importdata = async () => {
  try {
    // await Tour.create(tours, { validateBeforeSave: false });
    await User.create(users, { validateBeforeSave: false });
    //await Review.create(reviews, { validateBeforeSave: false });
    console.log('Successfully loading DB!!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deletedata = async () => {
  try {
    // await Tour.deleteMany();
    await User.deleteMany();
    //await Review.deleteMany();
    console.log('Successful DB Deletion!!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importdata();
} else if (process.argv[2] === '--delete') {
  deletedata();
}
//console.log(process.argv);
//process.exit();
