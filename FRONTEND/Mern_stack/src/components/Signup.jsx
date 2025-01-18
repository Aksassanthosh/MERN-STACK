// Signup.jsx
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axiosinterceptor';

const Signup = () => {
  const [form, setForm] = useState({
    Name: '',
    Email: '',
    Password: '',
    Phone: '',
    Address: ''
  });

  const handleSubmit = () => {
    axiosInstance.post('http://localhost:5000/users/signup', form)
      .then((res) => {
        alert('Registration successful');
      })
      .catch((error) => {
        alert('Registration failed');
      });
  };

  return (
    <div style={{ margin: '10%' }}>
      <Typography variant="h4" style={{ color: 'purple' }}>Signup</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={form.Name}
            onChange={(e) => setForm({ ...form, Name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={form.Email}
            onChange={(e) => setForm({ ...form, Email: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={form.Password}
            onChange={(e) => setForm({ ...form, Password: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            value={form.Phone}
            onChange={(e) => setForm({ ...form, Phone: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={form.Address}
            onChange={(e) => setForm({ ...form, Address: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Signup
          </Button>
        </Grid>
      </Grid>
      <div>
        <Link to="/">Already have an account? Login here</Link>
      </div>
    </div>
  );
};

export default Signup;
