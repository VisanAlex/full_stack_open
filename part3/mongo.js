// mongo.js
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

const connectToDatabase = () => {
  mongoose.connect(url)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.log('Error connecting to MongoDB:', error.message);
    });
};

module.exports = connectToDatabase;
