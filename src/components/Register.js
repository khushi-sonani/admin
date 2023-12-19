import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import logo from './img/logo.jpg';
import './register.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './register.css'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
import PersonIcon from '@mui/icons-material/Person';

function Signup({ registerEmployee }) {
  const [date, setDate] = useState();
  const [dob, setDob] = useState(null);
  const [dojoining, setDojoining] = useState(null);
  const navigate = useNavigate(); 
  const [gender, setGender] = useState('');

  const handleChanges = (event) => {
    setGender(event.target.value);
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNo: '',
    pannumber: '',
    adharnumber: '',
    gender: '', // Initialize the gender field
    address: '',
    password:' ',
  });

  const [selectedGender, setSelectedGender] = useState(''); // Initialize selectedGender

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value); // Update selectedGender
  };

  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: 'You have successfully registered!',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/dashboard'); // Redirect to the desired route
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
        pannumber: '',
        adharnumber: '',
        gender: selectedGender, // Use selectedGender for gender
        address: '',
        password:' ',
      });

      showSuccessAlert();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Registration Failed',
        text: 'Failed to sign up. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
    <div className="sidebar">
  <Sidebar />
</div>

<form  onSubmit={handleSubmit}  >
       <ToastContainer />
       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' , marginLeft:'250px'}}>
        <Link to="/dashboard">
          <ArrowBackIcon /> {/* Back icon */}
        </Link>
        <b style={{ marginRight: '700px' }}>Add Employee</b>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '250px', marginTop: '30px' }}>
  <div
    style={{
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'darkgray',
    }}
  >
    <PersonIcon style={{ fontSize: 50, color: 'white' }} />
  </div>
  <div style={{ fontSize: '30px', marginLeft: '20px', color:'#303f9f' }}>Add Employee</div>
   <Button    id="submit-button"  type="submit" style={{ marginLeft: '700px', backgroundColor:'#e57373', color:'white', width:'250px', height:'40', fontSize:'20px' }}>Save</Button>	

</div>

<hr style={{ height: '1px', background: 'lightgray', border: '0px', marginTop: '10px', borderRadius:'2px' }} />

<div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
  <div className='sub-main'>
    <div style={{ marginLeft:'200px'}}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '150px', marginRight: '10px', color:'black' }}>Name:</label>
        <input style={{ width: '500px', borderRadius:'5px' }} name="name" type="text" size="small" onChange={handleChange} />
      </div>
      <br />

      <div style={{ display: 'flex', alignItems: 'center' , color:'black' }}>
        <label style={{ width: '150px', marginRight: '10px' }}>Mobile No:</label>
        <TextField name="mobileNo" style={{ width: '500px', borderRadius:'5px' }} type="number" size="small" onChange={handleChange} />
      </div>
      <br />

      <div style={{ display: 'flex', alignItems: 'center', color:'black'  }}>
        <label style={{ width: '150px', marginRight: '10px' }}>E-mail:</label>
        <TextField name="email" style={{ width: '500px', borderRadius:'5px' }} type="text" size="small" onChange={handleChange} />
      </div>
      <br />

      <div style={{ display: 'flex', alignItems: 'center', color:'black'  }}>
        <label style={{ width: '150px', marginRight: '10px' }}>Adhar Number:</label>
        <TextField name="adharnumber" style={{ width: '500px', borderRadius:'5px' }} size="small" onChange={handleChange} />
      </div>
      <br />

      <div style={{ display: 'flex', alignItems: 'center' , color:'black' }}>
        <label style={{ width: '150px', marginRight: '10px' }}>Pan number:</label>
        <TextField label="" name="pannumber"  style={{ width: '500px', borderRadius:'5px' }} type="text" size="small" onChange={handleChange} />
      </div>
      <br />
      <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ width: '150px', marginRight: '10px', color: 'black' }}>Gender:</label>
                <Select
                  value={selectedGender}
                  name="gender"
                  onChange={handleGenderChange} // Use handleGenderChange for onChange
                  style={{ width: '500px', borderRadius: '5px' }}
                  size="small"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </div>
    <br />
     
     
       <div style={{ display: 'flex', alignItems: 'center', color:'black'  }}>
        <label style={{ width: '150px', marginRight: '10px' }}>Address:</label>
        <TextField label="" name="address"    multiline  rows={2}   style={{ width: '500px', borderRadius:'5px' }} type="text" size="small" onChange={handleChange} />
      </div><br/>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '150px', marginRight: '10px', color:'black' }}>Password:</label>
        <input style={{ width: '500px', borderRadius:'5px' }} name="password" type="text" size="small" onChange={handleChange} />
      </div>
      
    </div>
  </div>
  </div>
</form>

    </div>
  );
}

export default Signup;
