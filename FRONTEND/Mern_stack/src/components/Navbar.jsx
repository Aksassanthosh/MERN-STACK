// Navbar.jsx
import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = sessionStorage.getItem('logintoken'); // Check if user is logged in

  const handleLogout = () => {
    sessionStorage.removeItem('logintoken'); // Remove token from sessionStorage on logout
    window.location.href = '/'; // Redirect to the login page
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: 'purple' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employee Management System
          </Typography>

          {token ? (
            <>
              <Link to="/blogs" style={{ textDecoration: 'none' }}>
                <Button style={{ color: 'white' }}>Employee List</Button>
              </Link>
              <Link to="/addblogs" style={{ textDecoration: 'none' }}>
                <Button style={{ color: 'white' }}>Add Employee</Button>
              </Link>
              <Button style={{ color: 'white' }} onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button style={{ color: 'white' }}>Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
