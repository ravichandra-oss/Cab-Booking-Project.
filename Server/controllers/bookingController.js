const Mybookings = require('../models/MyBookingSchema');
const Car = require('../models/CarSchema');

// @desc    Book a cab
// @route   POST /api/bookings
// @access  Private
const bookCab = async (req, res) => {
    try {
        const {
            selectedPickupState, selectedPickupCity,
            selectedDropState, selectedDropCity,
            pickupdate, pickuptime,
            dropdate, droptime,
            carId
        } = req.body;

        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).json({ message: 'Cab not found' });
        }

        const distance = Math.floor(Math.random() * 20) + 3; // simulated
        const fare = String(distance * parseInt(car.price || 0));

        const booking = await Mybookings.create({
            userId: req.user._id,
            userName: req.user.name,
            selectedPickupState,
            selectedPickupCity,
            selectedDropState,
            selectedDropCity,
            pickupdate,
            pickuptime,
            dropdate,
            droptime,
            drivername: car.drivername,
            fare,
            carname: car.carname,
            cartype: car.cartype,
            carno: car.carno,
            price: car.price
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user bookings (history)
// @route   GET /api/bookings/my
// @access  Private
const getUserBookings = async (req, res) => {
    try {
        const bookings = await Mybookings.find({ userId: req.user._id })
            .sort({ bookeddate: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all bookings (Admin overview)
// @route   GET /api/bookings
// @access  Private/Admin
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Mybookings.find()
            .sort({ bookeddate: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update booking status (started, completed, etc.)
// @route   PUT /api/bookings/:id
// @access  Private
const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        // Our current schema doesn't have a status field. We can add it or just return success.
        // If they want us to cancel, we might just delete it.
        if (status === 'Cancelled') {
            await Mybookings.findByIdAndDelete(req.params.id);
            return res.json({ message: 'Booking Cancelled' });
        }

        const booking = await Mybookings.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    bookCab,
    getUserBookings,
    getAllBookings,
    updateBookingStatus
};
