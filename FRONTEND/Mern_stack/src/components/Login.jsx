import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import axiosInstance from '../axiosInterceptor'
const Login = () => {

    const [form,setForm] = useState({
        Email:'',
        Password:''
      })

    const navigate = useNavigate();
    function capvalue(){
        axiosInstance.post('http://localhost:5000/users/login', form).then((res) =>{
            alert(res.data.message)
            if(res.data.token){
                const token = res.data.token;
                sessionStorage.setItem('logintoken',token);
                const decodedToken = jwtDecode(token);
                sessionStorage.setItem('role', decodedToken.role);
                navigate('/employees');
            }
            else{
                navigate('/');
            }
        }).catch((error) =>{
            alert('Invalid login');
        })
    }

  return (
    <div style={{margin:'40%'}}>
        <Typography variant='h3'style={{color: 'grey'}}>Login</Typography><br></br><br></br>
        <TextField label='Email' variant='outlined' name="Email" onChange={(e)=>{
          setForm({...form,Email:e.target.value})
        }}></TextField><br></br><br></br>
        <TextField label='Password' variant='outlined'name="Password" type="password" onChange={(e)=>{
          setForm({...form,Password:e.target.value})
        }}></TextField>
        <br></br><br></br>
        <Button color="primary" variant='contained' onClick={capvalue}>Login</Button>
        <div>
            <Link to={'/signup'} style={{color: 'green'}}>New user? Please Register here</Link>
        </div>
    </div>
  )
}

export default Login
