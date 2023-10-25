import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import './Login.css';
import logo from './img/logo.jpg';
import { TextField, Button, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Backdrop from '@mui/material/Backdrop';

function FormValidation() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApi = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        'https://attendance-backend-five.vercel.app/login',
        {
          name: name,
          password: password,
        }
      );
      const result = response.data;

      if (result.statusCode === 200 && result.token && result.mobileNo) {
        const { token, mobileNo } = result;

        // Store the token and mobile number in cookies
        Cookies.set('authToken', token, { expires: 7 });
        Cookies.set('mobileNo', mobileNo, { expires: 7 });

        // Delay closing the Backdrop to allow time for the alert to be displayed
        setTimeout(() => {
          setLoading(false);
          handleClose(); // Close the Backdrop
          alert('Login successful');
          // You can redirect to '/punchin' or another route here
          navigate('/dashboard');
        }, 1000); // Adjust the delay time as needed
      } else {
        // Delay closing the Backdrop to allow time for the alert to be displayed
        setTimeout(() => {
          alert('Login failed. Please check your credentials.');
          setLoading(false);
        }, 1000); // Adjust the delay time as needed
      }
    } catch (error) {
      console.error('Fetch error:', error);
      // Delay closing the Backdrop to allow time for the alert to be displayed
      setTimeout(() => {
        alert('User name or password is not correct.');
        setLoading(false);
      }, 1000); // Adjust the delay time as needed
    }
  };

  return (
    <form>
      <div className="main"    style={{
        filter: loading ? 'blur(1px)' : 'none', // Apply blur effect to the entire component when loading
      }}>
        <div className="sub-main">
          <div>
            <div className="imgs">
              <div className="container-img">
                <img src={logo} alt="logo" className="logo" />
              </div>
            </div>
            <h1 className="h1">Login</h1>
            <div>
              <TextField
                label="Name"
                name="name"
                id="outlined-size-small"
                size="small"
                value={name}
                onChange={handleName}
              />
            </div>
            <div className="second-input">
              <TextField
                label="Password"
                name="password"
                id="outlined-size-small"
                size="small"
                value={password}
                onChange={handlePassword}
              />
            </div>
            <br />
            <div className="btn">
              <Box position="relative" >
                <Button
                  type="button"
                  style={{ backgroundColor: '#4f5cd7' }}
                  variant="contained"
                  size="large"
                  onClick={handleApi}
                >
                  Login
                </Button>
              
                  {loading && <CircularProgress color="inherit" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // Center the loader
        color: 'black', // Set the loader color
        zIndex: 9999, // Make sure the loader is above other elements
      }} />}
              
              </Box>
            </div>
            <br />
            <div>
              <a className="xyz" style={{ textDecoration:'none'}} href="Signup">
                Do not have an account? <b>Sign up</b>
              </a>
            </div>
            <div>
              <a href="dashboard" style={{ textDecoration:'none'}} className="p">
                <b>dashboard</b>
              </a>
             
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormValidation;
