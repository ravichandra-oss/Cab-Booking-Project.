const express = require('express');
const router = express.Router();
const { getAllCars, getCarById, addCar, updateCar, deleteCar } = require('../controllers/carController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

router.get('/', getAllCars);
router.get('/:id', getCarById);
router.post('/', protect, adminOnly, upload.single('image'), addCar);
router.put('/:id', protect, adminOnly, upload.single('image'), updateCar);
router.delete('/:id', protect, adminOnly, deleteCar);

module.exports = router;
