import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
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

  useEffect(() => {
    // Fetch holidays when the component mounts
    fetchHolidays();
  }, []); // The empty dependency array ensures it only runs once on component mount

  const fetchHolidays = async () => {
    try {
      const response = await axios.get('https://attendance-backend-five.vercel.app/holiday/holidays');
      setHolidays(response.data);
    } catch (error) {
      console.error('Error fetching holidays:', error);
    }
  };

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
        fetchHolidays();
      } else {
        alert('Please select a date');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding holiday');
    }
  };
  
  holidays.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      <Sidebar />
      <h1 style={{ textAlign: 'center' }}>Holiday List</h1>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        className="add"
        onClick={handleClickOpen}
        style={{ marginLeft: '90%' }}
      >
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent className="dialog-content">
        <TextField
            label="Holiday Name"
            variant="outlined"
            className="text-input"
            style={{ width: '260px' }}
            value={holidayType}
            onChange={(e) => setHolidayType(e.target.value)}
          />
          <div style={{ marginTop: '10px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Select Date"
                  id="date"
                  value={date}
                  onChange={handleDateChange} // This should be correctly linked to the date picker
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="dialog-buttons">
            <Button variant="contained" onClick={handleClose} style={{ width: '120px', marginTop: '30px', marginRight: '20px' }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit} style={{ width: '120px', marginTop: '30px' }}>
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Display the list of holidays */}
      <table style={{ marginLeft: '250px', backgroundColor: '#f0f0f0' }}>
    <thead>
      <tr>
        <th>Holiday Type</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {holidays.map((holiday) => (
        <tr key={holiday.id}>
          <td>{holiday.holidaytype}</td>
          <td>{holiday.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
  );
}

export default Holiday;
