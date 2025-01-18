// Login.jsx
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axiosinterceptor';

const Login = () => {
  const [form, setForm] = useState({ Email: '', Password: '' });
  const navigate = useNavigate();

  const handleSubmit = () => {
    axiosInstance.post('http://localhost:5000/users/login', form)
      .then((res) => {
        if (res.data.token) {
          sessionStorage.setItem('logintoken', res.data.token); // Save the token in sessionStorage
          navigate('/home'); // Redirect to employee list
        } else {
          alert('Invalid credentials');
        }
      })
      .catch(() => {
        alert('Invalid login');
      });
  };

  return (
    <div style={{ margin: '10%' }}>
      <Typography variant="h4" style={{ color: 'purple' }}>Login</Typography>
      <TextField
        label="Email"
        variant="outlined"
        value={form.Email}
        onChange={(e) => setForm({ ...form, Email: e.target.value })}
        fullWidth
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={form.Password}
        onChange={(e) => setForm({ ...form, Password: e.target.value })}
        fullWidth
        style={{ marginTop: '10px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: '10px' }}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
