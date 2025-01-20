const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Name: String, 
    Email: String,
    Password: String,
    role:  String
});

const User = mongoose.model('Userr', userSchema);
module.exports = User;
