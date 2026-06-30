const Admin = require('../models/AdminSchema');
const User = require('../models/UserSchema');
const Car = require('../models/CarSchema');
const Mybookings = require('../models/MyBookingSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id, role = 'Admin') => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'supersecretkey', { expiresIn: '30d' });
};

// Register admin
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const adminExists = await Admin.findOne({ email });
        if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const admin = await Admin.create({ name, email, password: hashedPassword });

        res.status(201).json({
            _id: admin._id, name: admin.name, email: admin.email,
            role: 'Admin', token: generateToken(admin._id, 'Admin')
        });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

// Login admin
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (admin && (await bcrypt.compare(password, admin.password))) {
            res.json({
                _id: admin._id, name: admin.name, email: admin.email,
                role: 'Admin', token: generateToken(admin._id, 'Admin')
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) { res.status(500).json({ message: error.message }); }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

// Get single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) { res.json(user); }
        else { res.status(404).json({ message: 'User not found' }); }
    } catch (error) { res.status(500).json({ message: error.message }); }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await user.save();
        res.json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

// Analytics
const getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalCars = await Car.countDocuments();
        const totalBookings = await Mybookings.countDocuments();
        res.json({ totalUsers, totalCars, totalBookings });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { registerAdmin, loginAdmin, getAllUsers, getUserById, updateUser, deleteUser, getAnalytics };
