import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function Holiday() {
  const [open, setOpen] = useState(false);
  const [holidayType, setHolidayType] = useState('');
  const [date, setDate] = useState(null);
  const [textValue, setTextValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch('https://attendance-backend-five.vercel.app/holiday/holidays');
        if (response.ok) {
          const data = await response.json();
          setHolidays(data.holidays);
          console.log(data.holidays)
          setLoading(false);
        } else {
          console.error('Error fetching holidays:', response.statusText);
          setError('Failed to fetch holiday records');
          setLoading(false);
        }
      } catch (error) {
        console.error('Network error:', error);
        setError('Network error');
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (date) {
        // Create a new date object by adjusting the selected date by one day
        const adjustedDate = new Date(date);
        adjustedDate.setDate(adjustedDate.getDate() + 1);
  
        // Format the adjusted date to "YYYY-MM-DD"
        const formattedDate = adjustedDate.toISOString().split('T')[0];
  
        await axios.post('https://attendance-backend-five.vercel.app/holiday/holidays', {
          holidaytype: holidayType,
          date: formattedDate,
        });
  
        alert('Holiday added successfully');
        setHolidayType('');
        setDate(null);
        handleClose();
        // After adding a holiday, fetch the updated list of holidays
        
      } else {
        alert('Please select a date');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding holiday');
    }
  };
  


  return (
    <div>
    <div className="sidebar">
      <Sidebar />
    </div>
    <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Holiday List</h1>
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      className="add"
      onClick={handleClickOpen}
      style={{ marginLeft: '57%', marginTop: '40px' }}
    >
      Add New Holiday
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Holiday</DialogTitle>
      <Divider />
      <DialogContent className="dialog-content">
        {/* ... (previous code) */}
      </DialogContent>
    </Dialog>

    <div style={{ marginLeft:'300px', color:'black', marginTop:'100px'}}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
        
        
          <ul>
            {holidays.map((holiday) => (
              <li key={holiday._id}>
                {/* Display details of each holiday record as needed */}
                Date: {holiday.date},      h Name: {holiday.holidaytype}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
  );
}

export default Holiday;
