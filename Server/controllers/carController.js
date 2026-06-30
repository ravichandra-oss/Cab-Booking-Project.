const Car = require('../models/CarSchema');

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({});
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get car by ID
// @route   GET /api/cars/:id
// @access  Public
const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (car) {
            res.json(car);
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new car
// @route   POST /api/cars
// @access  Private/Admin
const addCar = async (req, res) => {
    try {
        const { drivername, carname, cartype, price, carno } = req.body;
        const carImage = req.file ? `/uploads/${req.file.filename}` : '';

        const car = await Car.create({
            drivername,
            carname,
            cartype,
            price,
            carno,
            carImage
        });

        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update car details
// @route   PUT /api/cars/:id
// @access  Private/Admin
const updateCar = async (req, res) => {
    try {
        const { drivername, carname, cartype, price, carno, isAvailable } = req.body;
        const car = await Car.findById(req.params.id);

        if (car) {
            car.drivername = drivername || car.drivername;
            car.carname = carname || car.carname;
            car.cartype = cartype || car.cartype;
            car.price = price || car.price;
            car.carno = carno || car.carno;
            if (isAvailable !== undefined) car.isAvailable = isAvailable;
            
            if (req.file) {
                car.carImage = `/uploads/${req.file.filename}`;
            }

            const updatedCar = await car.save();
            res.json(updatedCar);
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
const deleteCar = async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: 'Car removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCars,
    getCarById,
    addCar,
    updateCar,
    deleteCar
};
