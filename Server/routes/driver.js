const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Driver = require('../models/Driver');
const Ride = require('../models/Ride');
const Transaction = require('../models/Transaction');
const { protect } = require('../middleware/auth');

const generateToken = (id, type = 'driver') => {
    return jwt.sign({ id, type }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register Driver
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, licenseNumber, vehicleType, vehicleModel, vehiclePlate } = req.body;
        const driverExists = await Driver.findOne({ email });
        if (driverExists) return res.status(400).json({ message: 'Driver already exists' });

        const driver = await Driver.create({
            name, email, password, phone, licenseNumber, vehicleType, vehicleModel, vehiclePlate
        });
        res.status(201).json({
            _id: driver._id,
            name: driver.name,
            email: driver.email,
            vehicleType: driver.vehicleType,
            token: generateToken(driver._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login Driver
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const driver = await Driver.findOne({ email });
        if (driver && (await driver.matchPassword(password))) {
            res.json({
                _id: driver._id,
                name: driver.name,
                email: driver.email,
                vehicleType: driver.vehicleType,
                isAvailable: driver.isAvailable,
                totalEarnings: driver.totalEarnings,
                totalRides: driver.totalRides,
                token: generateToken(driver._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get assigned rides for driver
router.get('/rides', protect, async (req, res) => {
    try {
        const rides = await Ride.find({ driver: req.driver._id })
            .populate('user', 'name phone')
            .sort({ createdAt: -1 });
        res.json(rides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Accept ride
router.put('/rides/:id/accept', protect, async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) return res.status(404).json({ message: 'Ride not found' });
        ride.driver = req.driver._id;
        ride.status = 'Accepted';
        await ride.save();
        await Driver.findByIdAndUpdate(req.driver._id, { isAvailable: false });
        res.json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Reject ride
router.put('/rides/:id/reject', protect, async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) return res.status(404).json({ message: 'Ride not found' });
        ride.driver = null;
        ride.status = 'Pending';
        await ride.save();
        res.json({ message: 'Ride rejected' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update ride status (start / complete)
router.put('/rides/:id/status', protect, async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) return res.status(404).json({ message: 'Ride not found' });

        const { status } = req.body;
        ride.status = status;
        if (status === 'Started') ride.startedAt = new Date();
        if (status === 'Completed') {
            ride.completedAt = new Date();
            await Driver.findByIdAndUpdate(req.driver._id, {
                isAvailable: true,
                $inc: { totalEarnings: ride.fare, totalRides: 1 }
            });
            await Transaction.create({
                ride: ride._id,
                user: ride.user,
                driver: req.driver._id,
                amount: ride.fare,
                status: 'Completed'
            });
        }
        await ride.save();
        res.json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get driver earnings
router.get('/earnings', protect, async (req, res) => {
    try {
        const driver = await Driver.findById(req.driver._id);
        const transactions = await Transaction.find({ driver: req.driver._id })
            .populate('ride', 'pickupLocation dropLocation cabType')
            .sort({ createdAt: -1 });
        res.json({ totalEarnings: driver.totalEarnings, totalRides: driver.totalRides, transactions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
