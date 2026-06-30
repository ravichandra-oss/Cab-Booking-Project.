const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const Admin = require('../models/AdminSchema');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');

            if (decoded.role === 'Admin') {
                const admin = await Admin.findById(decoded.id).select('-password');
                req.admin = admin;
                req.user = admin; // So controllers can uniformly use req.user
                req.role = 'Admin';
            } else {
                req.user = await User.findById(decoded.id).select('-password');
                req.role = 'User';
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const adminOnly = (req, res, next) => {
    if (req.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ message: 'Admin access only' });
    }
};

module.exports = { protect, adminOnly };
