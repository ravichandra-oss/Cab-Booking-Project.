const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const DriverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    vehicleType: { type: String, enum: ['Mini', 'Sedan', 'SUV'], required: true },
    vehicleModel: { type: String, required: true },
    vehiclePlate: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    totalEarnings: { type: Number, default: 0 },
    totalRides: { type: Number, default: 0 }
}, { timestamps: true });

DriverSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

DriverSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Driver', DriverSchema);
