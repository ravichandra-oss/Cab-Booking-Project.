const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },
    pickupLocation: { type: String, required: true },
    dropLocation: { type: String, required: true },
    cabType: { type: String, enum: ['Mini', 'Sedan', 'SUV'], required: true },
    fare: { type: Number, required: true },
    distance: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Started', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    scheduledAt: { type: Date, default: null },
    startedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
    cancelledAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Ride', RideSchema);
