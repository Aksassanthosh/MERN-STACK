// AddEmployee.jsx
import React, { useState } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [form, setForm] = useState({
    Name: '',
    Designation: '',
    Salary: '',
   
  })}