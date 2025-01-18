const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Role: { type: String, default: 'Userr' } // Role is always "User" for general users
});

const User = mongoose.model('Userr', userSchema);
module.exports = User;
