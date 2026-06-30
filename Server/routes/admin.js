const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Driver = require('../models/Driver');
const Ride = require('../models/Ride');
const Transaction = require('../models/Transaction');
const { protect, adminOnly } = require('../middleware/auth');

// Get all users
router.get('/users', protect, adminOnly, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all drivers
router.get('/drivers', protect, adminOnly, async (req, res) => {
    try {
        const drivers = await Driver.find().select('-password');
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete user
router.delete('/users/:id', protect, adminOnly, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete driver
router.delete('/drivers/:id', protect, adminOnly, async (req, res) => {
    try {
        await Driver.findByIdAndDelete(req.params.id);
        res.json({ message: 'Driver removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all bookings
router.get('/bookings', protect, adminOnly, async (req, res) => {
    try {
        const rides = await Ride.find()
            .populate('user', 'name email phone')
            .populate('driver', 'name phone vehicleType')
            .sort({ createdAt: -1 });
        res.json(rides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all transactions
router.get('/transactions', protect, adminOnly, async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('user', 'name email')
            .populate('driver', 'name')
            .populate('ride', 'pickupLocation dropLocation cabType fare')
            .sort({ createdAt: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Dashboard analytics
router.get('/analytics', protect, adminOnly, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalDrivers = await Driver.countDocuments();
        const totalRides = await Ride.countDocuments();
        const completedRides = await Ride.countDocuments({ status: 'Completed' });
        const cancelledRides = await Ride.countDocuments({ status: 'Cancelled' });
        const pendingRides = await Ride.countDocuments({ status: 'Pending' });
        const totalRevenue = await Transaction.aggregate([
            { $match: { status: 'Completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        res.json({
            totalUsers,
            totalDrivers,
            totalRides,
            completedRides,
            cancelledRides,
            pendingRides,
            totalRevenue: totalRevenue[0]?.total || 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
