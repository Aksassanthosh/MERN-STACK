import React, { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent,  Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';

const Home = () => {

    const [cardData,setData] = useState([]);
    const navigate = useNavigate();
    const role = sessionStorage.getItem('role');
    
    useEffect(() =>{
        axiosInstance.get('http://localhost:5000/employees').then((res) =>{
            setData(res.data);
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    function update_data(val){
        navigate('/addemployee',{state:{val}})
        //state is a keyword
    }

    const delete_data = (id) => {
        axiosInstance.delete(`http://localhost:5000/employees/deleteemployee/${id}`)
          .then(() => {
            setData(cardData.filter((item) => item._id !== id)); // Update the UI after deletion
            alert(" deleted successfully");
            navigate('/employees'); // Navigate back to the Home page
          })
          .catch((error) => {
            console.log(error);
            alert("Failed to delete ");
          });
      };


  return (
    <div 
style={{ margin: '6%' }}>
            <Grid container spacing={4}>
                {cardData.map((row) => (
                    <Grid item xs={12} sm={6} md={4} key={row._id}>
            <Card sx={{ maxWidth: 345 }}>
                
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {row.Name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.Designation}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.Salary}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.Department}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.employeeLocation}
                    </Typography>
                </CardContent>
                {role == 'Admin' && (
                <CardActions>
                    <Button size="small" color='secondary' variant='contained'onClick={(()=>{update_data(row);})}>Update</Button>
                    <Button size="small" color='primary' variant='contained' onClick={() => {delete_data(row._id)}}>Delete</Button>
                </CardActions>
                )}
            </Card>
            </Grid>
            ))}
        </Grid>
        
    </div>
  )
}

export default Home