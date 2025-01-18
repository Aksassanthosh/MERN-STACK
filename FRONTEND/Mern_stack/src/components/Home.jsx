// Home.jsx
import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import axiosInstance from '../axiosinterceptor';

const Home = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axiosInstance.get('http://localhost:5000/admin/home', {
      headers: {
        token: sessionStorage.getItem('logintoken')
      }
    })
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  return (
    <div>
      <Typography variant="h4" style={{ color: 'purple' }}>Employee List</Typography>
      <Grid container spacing={3}>
        {employees.map((employee) => (
          <Grid item xs={12} sm={6} md={4} key={employee._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{employee.Name}</Typography>
                <Typography variant="body2">{employee.Designation}</Typography>
                <Typography variant="body2">{employee.Salary}</Typography>
                <Typography variant="body2">{employee.Department}</Typography>
                <Typography variant="body2">{employee.Location}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
