const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getAllUsers, getUserById, updateUser, deleteUser, getAnalytics } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/users', protect, adminOnly, getAllUsers);
router.get('/users/:id', protect, adminOnly, getUserById);
router.put('/users/:id', protect, adminOnly, updateUser);
router.delete('/users/:id', protect, adminOnly, deleteUser);
router.get('/analytics', protect, adminOnly, getAnalytics);

module.exports = router;
