const express = require('express');
const router = express.Router();
const { bookCab, getUserBookings, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.post('/', protect, bookCab);
router.get('/my', protect, getUserBookings);
router.get('/', protect, adminOnly, getAllBookings);
router.put('/:id', protect, updateBookingStatus);

module.exports = router;
