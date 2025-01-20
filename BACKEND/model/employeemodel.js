const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    
    Name:  String,
    Designation: String, 
    Salary: Number, 
    Department:  String, 
    employeeLocation:  String,
});

const Employee = mongoose.model('employeee', employeeSchema);
module.exports = Employee;
