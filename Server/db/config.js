const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cab_booking');
        console.log('MongoDB Connected successfully');
    } catch (error) {
        console.error('Database connection error:', error.message);
        console.log('Running backend server without database...');
    }
};

module.exports = connectDB;
