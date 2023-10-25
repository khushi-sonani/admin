import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import logo from './img/logo.jpg';
import './register.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom"; 
import Swal from 'sweetalert2'; // Import SweetAlert
import 'sweetalert2/src/sweetalert2.scss'; 
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "react-datepicker/dist/react-datepicker.css";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup({ registerEmployee }) {
  const [date, setDate] = useState();
  const [dob, setDob] = useState(null);
  const [dojoining, setDojoining] = useState(null);
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNo: '',
  });

  const [PostData, setPostData] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: 'You have successfully registered!',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
    }).then((result) => {
      // Handle the "OK" button click
      if (result.isConfirmed) {
        navigate('/emp'); // Redirect to the desired route
      }
    });
  };
  
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await axios.post(
        'https://attendance-backend-five.vercel.app/company',
        formData
      );
  
      setFormData({
        name: '',
        email: '',
        password: '',
        mobileNo: '',
      });
  
      setRegistrationSuccess(true);
    

      showSuccessAlert();

     

    } catch (error) {
      console.error(error);
      setRegistrationSuccess(false);
      
      Swal.fire({
        title: 'Registration Failed',
        text: 'falied in sign up try again ',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
       <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className='main'>
          <div className='sub-main'>
            <div>
              <div className='imgs'>
                <div className='container-img'>
                  <img src={logo} alt='logo' className='logo' />
                </div>
              </div>
              <h1 className='h1'>Registration</h1>
              <div>
                <TextField label="User name" name="name" type="text" size="small" onChange={handleChange} />
              </div><br/>
              <div>
                <TextField label="Mobile No" name="mobileNo" type="number" size="small" onChange={handleChange}/>
              </div><br/>
              <div>
                <TextField label="E-mail" name="email" type="text" size="small" onChange={handleChange} />
              </div><br/>
              <div>
                <TextField label="Password"  name="password" type="password" size="small" onChange={handleChange}/>
              </div><br/>
              <div className="btn">
                <Button type='submit'  id="submit-button" variant="contained" size="large" style={{ backgroundColor:'#4f5cd7'}}>Submit</Button>
              </div>
              <p className='link' style={{ cursor: "pointer", paddingBottom:'50px' }} onClick={() => navigate("/")}>
                already have an account? <b>Login</b>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
