require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', require('./routes/user'));
app.use('/api/drivers', require('./routes/driver'));
app.use('/api/rides', require('./routes/ride'));
app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => {
    res.json({ message: 'Cab Booking API is running' });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.log('MongoDB connection error:', err.message);
        console.log('Starting server without DB...');
        app.listen(PORT, () => console.log(`Server running on port ${PORT} (no DB)`));
    });
