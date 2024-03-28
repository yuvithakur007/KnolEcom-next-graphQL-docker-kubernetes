const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb+srv://yuvi:12340987@ecommerce.phdjrpa.mongodb.net/?retryWrites=true&w=majority');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error);
    process.exit(1); 
  }
};

module.exports = {connectDB};