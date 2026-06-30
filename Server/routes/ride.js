const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');
const Driver = require('../models/Driver');
const Transaction = require('../models/Transaction');
const { protect } = require('../middleware/auth');

// Fare rates per km
const FARE_RATES = { Mini: 8, Sedan: 12, SUV: 18 };

// Book a ride
router.post('/book', protect, async (req, res) => {
    try {
        const { pickupLocation, dropLocation, cabType, scheduledAt } = req.body;
        const distance = Math.floor(Math.random() * 20) + 3; // simulated distance 3-22 km
        const fare = distance * FARE_RATES[cabType];

        // Find an available driver with matching vehicle type
        const driver = await Driver.findOne({ vehicleType: cabType, isAvailable: true });

        const ride = await Ride.create({
            user: req.user._id,
            driver: driver ? driver._id : null,
            pickupLocation,
            dropLocation,
            cabType,
            fare,
            distance,
            status: driver ? 'Pending' : 'Pending',
            scheduledAt: scheduledAt || null
        });

        res.status(201).json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user's ride history
router.get('/history', protect, async (req, res) => {
    try {
        const rides = await Ride.find({ user: req.user._id })
            .populate('driver', 'name phone vehicleType vehicleModel vehiclePlate rating')
            .sort({ createdAt: -1 });
        res.json(rides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get ride by ID
router.get('/:id', protect, async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id)
            .populate('user', 'name phone email')
            .populate('driver', 'name phone vehicleType vehicleModel vehiclePlate rating');
        if (!ride) return res.status(404).json({ message: 'Ride not found' });
        res.json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Cancel ride
router.put('/:id/cancel', protect, async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) return res.status(404).json({ message: 'Ride not found' });
        if (ride.status === 'Completed') return res.status(400).json({ message: 'Cannot cancel completed ride' });

        ride.status = 'Cancelled';
        ride.cancelledAt = new Date();
        await ride.save();

        if (ride.driver) {
            await Driver.findByIdAndUpdate(ride.driver, { isAvailable: true });
        }
        res.json({ message: 'Ride cancelled', ride });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all pending rides (for drivers to pick)
router.get('/available/pending', protect, async (req, res) => {
    try {
        const rides = await Ride.find({ status: 'Pending', driver: null })
            .populate('user', 'name phone')
            .sort({ createdAt: -1 });
        res.json(rides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get fare estimate
router.post('/estimate', async (req, res) => {
    try {
        const { cabType } = req.body;
        const distance = Math.floor(Math.random() * 20) + 3;
        const fare = distance * FARE_RATES[cabType || 'Mini'];
        res.json({ distance, fare, cabType: cabType || 'Mini' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
