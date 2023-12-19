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

import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PersonIcon from '@mui/icons-material/Person';

const Salary = () => {
    const [empid, setempid] = useState('');
    const [salary, setsalary] = useState('');
    const [error, setError] = useState('');
  
    const postData = async (e) => {
      e.preventDefault(); // Prevent default form submission behavior
  
      try {
        // Basic validation
        if (!empid || !salary) {
          setError('Please enter both EmpID and Salary.');
          return;
        }
  
        console.log('EmpID:', empid);
        console.log('Salary:', salary);
  
        const response = await axios.post('https://attendance-backend-five.vercel.app/salary/salary', {
          empid: empid,
          salary: salary,
        });
  
        console.log(response.data);
        alert('Data saved successfully');
        setError('');
  
      
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        
      }
    };
 
  return (
    <div>
    <div className="sidebar">
  <Sidebar />
</div>

<form   onSubmit={postData} >
       <ToastContainer />
       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' , marginLeft:'250px'}}>
        <Link to="/dashboard">
          <ArrowBackIcon /> {/* Back icon */}
        </Link>
        <b style={{ marginRight: '700px' }}>Add salary</b>
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
  <div style={{ fontSize: '30px', marginLeft: '20px', color:'#303f9f' }}>Add Salary Details</div>
   <Button    id="submit-button"  type="submit" style={{ marginLeft: '650px', backgroundColor:'#e57373', color:'white', width:'250px', height:'40', fontSize:'20px' }}>Save</Button>	

</div>

<hr style={{ height: '1px', background: 'lightgray', border: '0px', marginTop: '10px', borderRadius:'2px' }} />

<div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
  <div className='sub-main'>
    <div style={{ marginLeft:'200px'}}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '150px', marginRight: '10px', color:'black' }}>Emp ID:</label>
        <input style={{ width: '500px', borderRadius:'5px' }} value={empid} onChange={(e) => setempid(e.target.value)} />
      </div>
      <br />

      <div style={{ display: 'flex', alignItems: 'center' , color:'black' }}>
        <label style={{ width: '150px', marginRight: '10px' }}> Salary:</label>
        <TextField  style={{ width: '500px', borderRadius:'5px' }} type="number" size="small" value={salary} onChange={(e) => setsalary(e.target.value)}  />
      </div>
      <br />

      
      
    </div>
  </div>
  </div>
</form>

    </div>
  );
}

export default Salary;
