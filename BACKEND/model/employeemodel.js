const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    EmployeeID: { type: String, required: true, unique: true },
    Name: { type: String, required: true },
    Designation: { type: String, required: true },
    Salary: { type: Number, required: true },
    Department: { type: String, required: true },
    Location: { type: String, required: true }
});

const Employee = mongoose.model('employeee', employeeSchema);
module.exports = Employee;
