const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
