const express = require('express');
const cors = require('cors');

require('dotenv').config();
require('./db/connection');

const employeeRoutes = require('./routes/employeeroutes');
const userRoutes = require('./routes/userroutes');

const app =new express();
app.use(cors());

app.use(express.json());

app.use('/employees', employeeRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
