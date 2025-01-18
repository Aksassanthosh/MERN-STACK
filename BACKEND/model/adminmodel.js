const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Role: { type: String, default: 'admin' } // Role is always "Admin" for admins
});

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;
