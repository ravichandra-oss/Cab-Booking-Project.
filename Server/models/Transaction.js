const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    ride: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['Cash', 'Card', 'UPI'], default: 'Cash' },
    status: { type: String, enum: ['Pending', 'Completed', 'Refunded'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
