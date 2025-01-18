const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
require('./db/connection');

const adminRoutes = require('./routes/adminroutes');
const userRoutes = require('./routes/userroutes');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
