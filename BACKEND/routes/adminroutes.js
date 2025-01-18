const express = require('express');
const router = express.Router();
const Admin = require('../model/adminmodel');
const User = require('../model/usermodel');
const Employee = require('../model/employeemodel');
const jwt = require('jsonwebtoken');

// Middleware for Admin Authentication
const verifyAdmin = (req, res, next) => {
    const token = req.headers.token;
    if (!token) return res.status(401).send({ message: 'Unauthorized access' });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (payload.Role !== 'Admin') throw 'Forbidden';
        req.admin = payload;
        next();
    } catch (error) {
        res.status(403).send({ message: 'Access forbidden: Admins only' });
    }
};

// Middleware for User Authentication
const verifyUser = (req, res, next) => {
    const token = req.headers.token;
    if (!token) return res.status(401).send({ message: 'Unauthorized access' });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        res.status(403).send({ message: 'Access forbidden' });
    }
};

// Admin Login
router.post('/login', async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const admin = await Admin.findOne({ Email });
        if (!admin) return res.status(404).send({ message: 'Admin not found' });

        if (admin.Password === Password) {
            const payload = { Email: admin.Email, Role: admin.Role };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).send({ message: 'Login successful', token });
        } else {
            res.status(400).send({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error logging in' });
    }
});

// CRUD for Employees (Admins Only)

// Create Employee
router.post('/employees/create', verifyAdmin, async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).send({ message: 'Employee created successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Error creating employee' });
    }
});

// Read All Employees (Admins and Users)
router.get('/employees', verifyUser, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving employees' });
    }
});

// Update Employee
router.put('/employees/update/:id', verifyAdmin, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send({ message: 'Employee updated successfully', employee });
    } catch (error) {
        res.status(400).send({ message: 'Error updating employee' });
    }
});

// Delete Employee
router.delete('/employees/delete/:id', verifyAdmin, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).send({ message: 'Employee not found' });
        res.status(200).send({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Error deleting employee' });
    }
});

module.exports = router;
