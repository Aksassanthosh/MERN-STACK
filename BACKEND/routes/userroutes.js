const express = require('express');
const router = express.Router();
const User = require('../model/usermodel');
const jwt = require('jsonwebtoken');
const Employee = require('../model/employeemodel');

// User Login
router.post('/login', async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const user = await User.findOne({ Email });
        if (!user) return res.status(404).send({ message: 'User not found' });

        if (user.Password === Password) {
            const payload = { Email: user.Email, Role: user.Role };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).send({ message: 'Login successful', token });
        } else {
            res.status(400).send({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error logging in' });
    }
});

// View Employees (Users Only)
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving employees' });
    }
});

module.exports = router;
