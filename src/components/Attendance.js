import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './attendancs.css';
import moment from 'moment';
import axios from 'axios';
import { TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import CloseIcon from '@mui/icons-material/Close';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Emp() {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [anchorEls, setAnchorEls] = useState([]);
  const [records, setRecords] = useState([]);

  const [presentCount, setPresentCount] = useState(null);
  const [absentCount, setAbsentCount] = useState(null);



  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleStaffChange = (event) => {
    setSelectedStaff(event.target.value);
  };
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Display the selected date in the console
    console.log('Selected Date:', date);
  };
  useEffect(() => {
    // Set the initial selected date to the current date when the component mounts
    setSelectedDate(new Date());
  }, []);


  // useEffect(() => {
  //   // console.log(numbers); // Log the updated numbers inside this useEffect
  // }, [numbers]);


  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };
  const handleMenuItemClick = (event) => {
    // Add code to handle the menu item click here
    // For example, you can navigate to a specific page or perform an action
    // Close the menu after performing the action
    setMenuOpen(false);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const drawerContent = (
    <List style={{ width: '400px' }}>
      <ListItem >
        <ListItemText primary="" />
        <div>
          <Button style={{ marginRight: '300px' }} onClick={handleDrawerClose}><CloseIcon /></Button>
          <h4 style={{ marginTop: '30px', marginLeft: '20px', backgroundColor: '#e0f7fa', padding: '8px', display: 'inline-block', borderRadius: '4px', width: '300px' }}>
            {dayjs(selectedDate).format('MMMM DD')}
          </h4>
          <p style={{ marginLeft: '20px' }}>Attendance Status</p>
          <Button variant='outlined' style={{ marginLeft: '20px', borderColor: '#00e676', color: '#00e676', borderRadius: '30px' }}>Present</Button>
          <Button variant='outlined' style={{ marginLeft: '20px', color: '#ff6d00', borderRadius: '30px', borderColor: '#ff6d00' }}>Half Day</Button>
          <Button variant='outlined' style={{ marginLeft: '20px', color: '#d32f2f', borderRadius: '30px', borderColor: '#d32f2f' }}>Absent</Button>
          <Button variant='outlined' style={{ marginLeft: '20px', color: '#616161', borderRadius: '30px', borderColor: '#616161', marginTop: '30px' }}>Day Off</Button>
          <p style={{ marginLeft: '20px', marginTop: '50px' }}>Leave Status</p>
          <Button
            variant="outlined"
            style={{ marginLeft: '20px', color: '#9c27b0', borderRadius: '30px', borderColor: '#9c27b0' }}
            onClick={handleMenuOpen} // Open the menu when the button is clicked
          >
            Paid Leave
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setMenuOpen(false)} // Close the menu when clicking outside
          >
            <MenuItem onClick={handleMenuItemClick}>Casual Leave</MenuItem>
            <MenuItem onClick={handleMenuItemClick}> Privilaged Leave</MenuItem>
            <MenuItem onClick={handleMenuItemClick}> Sick Leave</MenuItem>
          </Menu>

          <Button variant='outlined' style={{ marginLeft: '60px', color: '#3f51b5', borderRadius: '30px', borderColor: '#3f51b5', }}>Unpaid Leave</Button>
          <Button variant='outlined' style={{ marginLeft: '20px', color: '#9c27b0', borderRadius: '30px', borderColor: '#9c27b0', marginTop: '30px' }} onClick={handleMenuOpen}>Half Day Leave</Button>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setMenuOpen(false)} // Close the menu when clicking outside
          >
            <MenuItem onClick={handleMenuItemClick}>Casual Leave</MenuItem>
            <MenuItem onClick={handleMenuItemClick}> Privilaged Leave</MenuItem>
            <MenuItem onClick={handleMenuItemClick}> Sick Leave</MenuItem>
          </Menu>
          <p style={{ marginLeft: '20px', marginTop: '50px' }}>In & Out Time</p>
          <TextField label="Add Notes" multiline rows={2} style={{ width: '350px', borderRadius: '5px', marginLeft: '20px' }} type="text" size="small" />
          <Button variant='contained' style={{ marginLeft: '30px', color: 'white', borderRadius: '30px', marginTop: '20px' }}>Save Notes</Button>
        </div>
      </ListItem>

      {/* Add more items as needed */}
    </List>
  );

  const [selectedTime, setSelectedTime] = useState(null);


  const [attendanceData, setAttendanceData] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const formattedDate = formatDate(selectedDate); // Format the selected date to match your API's date format
  //       const response = await axios.get('https://attendance-backend-five.vercel.app/punching/attendance/count', {
  //         params: {
  //           date: formattedDate,
  //         },
  //       });

  //       if (response.status === 200) {
  //         setAttendanceData(response.data.data);
  //       } else {
  //         console.error('Failed to fetch attendance data.');
  //         // Handle the error as needed
  //       }
  //     } catch (error) {
  //       console.error('Error fetching attendance data:', error);
  //       // Handle the error as needed
  //     }
  //   };

  //   fetchData();
  // }, [selectedDate]);

  // Helper function to format the date (adjust this according to your API's date format)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const saveTimeData = async () => {
    try {
      if (selectedTime) {
        const formattedTime = selectedTime.toLocaleTimeString(); // Format the selected time to a string
        const response = await axios.post('https://attendance-backend-five.vercel.app/punching/attandance', {
          date: selectedDate,
          time: formattedTime,
        });

        if (response.status === 200) {
          // Data saved successfully
          console.log('Time data saved successfully.');
        } else {
          console.error('Failed to save time data.');
          // Handle the error as needed
        }
      }
    } catch (error) {
      console.error('Error saving time data:', error);
    }
  };

  useEffect(() => {
    // Your existing code for fetching and rendering data based on the selected date
  }, [selectedDate]);


  const [selectedTimeInArray, setSelectedTimeInArray] = useState(Array(users.length).fill(null));
  const [selectedTimeOutArray, setSelectedTimeOutArray] = useState(Array(users.length).fill(null));
  const handleTimeChangeIn = (time, userIndex) => {
    const newSelectedTimesIn = [...selectedTimeInArray];
    newSelectedTimesIn[userIndex] = time;
    setSelectedTimeInArray(newSelectedTimesIn);
  };

  const handleTimeChangeOut = (time, userIndex) => {
    const newSelectedTimesOut = [...selectedTimeOutArray];
    newSelectedTimesOut[userIndex] = time;
    setSelectedTimeOutArray(newSelectedTimesOut);
  };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    try {
      const response = await fetch(`https://attendance-backend-five.vercel.app/punching/matching-mobiles/${formattedDate}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error('Error:', error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const [view, setView] = useState('present'); // 'present' is the default view

  const toggleView = (newView) => {
    setView(newView);
  };

  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    // Replace 'url_of_your_server' with the actual URL where your server is running
    const apiUrl = 'https://attendance-backend-five.vercel.app/chats/adminchat';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the data you received from the server
        setChatData(data.chatMessages);
        console.log(data.chatMessages)
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        setError(error.message);
      });
  }, []);
  const [isTimeModalOpen, setTimeModalOpen] = useState(false);

  const handleTimeModalOpen = () => {
    setTimeModalOpen(true);
  };
  
  const handleTimeModalClose = () => {
    setTimeModalOpen(false);
  };
  const modalContentStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    background: 'white', // Set the background to white
    padding: '20px', // Add padding to the modal content
    boxShadow: 24,
    border: '2px solid #000',
  };
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);
  const [mobileNo, setMobileNo] = useState('');

  const handlePunchInTimeChange = (newTime) => {
    setPunchInTime(newTime);
  };

  const handlePunchOutTimeChange = (newTime) => {
    setPunchOutTime(newTime);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Format the selected times as needed (HH:mm:ss format)
      const formattedPunchInTime = punchInTime ? dayjs(punchInTime).format('HH:mm:ss') : null;
      const formattedPunchOutTime = punchOutTime ? dayjs(punchOutTime).format('HH:mm:ss') : null;

      // Send a POST request to your API with the formatted data
      const response = await axios.post('https://attendance-backend-five.vercel.app/latecount/latecounts', {
        punchintime: formattedPunchInTime,
        punchouttime: formattedPunchOutTime,
        mobileNo,
      });

      // Handle success, you can show a success message or redirect to a different page
      console.log('Latecount saved successfully:', response.data);
    } catch (error) {
      // Handle errors, you can display an error message
      console.error('Error saving latecount:', error);
    }
  };
  const [lateCounts, setLateCounts] = useState([]);
  const [lateCount, setLateCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        // Use the selectedDate state to fetch data for the chosen date
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const response = await axios.get(`https://attendance-backend-five.vercel.app/latecount/latecoun/${formattedDate}`);
        setLateCounts(response.data.attendanceRecords);
        setLateCount(response.data.late);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching late count data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedDate]);
  // Group punch in and punch out times by employee
  const groupedLateCounts = {};
  lateCounts.forEach((lateCount) => {
    if (!groupedLateCounts[lateCount.name]) {
      groupedLateCounts[lateCount.name] = {
        name: lateCount.name,
        punchInTime: '-',
        punchOutTime: '-',
      };
    }
    if (lateCount.status === 'Punch In') {
      groupedLateCounts[lateCount.name].punchInTime = lateCount.attendandanceTime;
    } else if (lateCount.status === 'Punch Out') {
      groupedLateCounts[lateCount.name].punchOutTime = lateCount.attendandanceTime;
    }
  });
  const [isTableVisible, setIsTableVisible] = useState(false);



  const [lateCountData, setLateCountData] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the current date
        const currentDate = new Date();
        
        // Format the current date in YYYY-MM-DD format
        const formattedCurrentDate = currentDate.toISOString().split('T')[0];

        const apiUrl = `https://attendance-backend-five.vercel.app/latecount/latecoun/${formattedCurrentDate}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setLateCountData(data);
          setLoading(false);
        } else {
          console.error('Error fetching late count data:', response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error('Network error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div >
      <div className="sidebar">
        <Sidebar />
      </div>
      <div style={{ marginLeft: '250px', marginTop: '30px' }}>
        {/* <h6> Branch </h6> 
          <FormControl variant="outlined" style={{ height: '70px', width: '200px', marginLeft:'0px' }}>
          <Select
  id="branch-select-branch"
  value={selectedBranch}
  onChange={handleBranchChange}
  style={{ height: '30px' }}
>
  <MenuItem value="">All Balances</MenuItem>
  <MenuItem value="branch1">Branch 1</MenuItem>
  <MenuItem value="branch2">Branch 2</MenuItem>
  <MenuItem value="branch3">Branch 3</MenuItem>
</Select>


      </FormControl> */}

        <h6 style={{ color: 'black' }}>Date</h6>
        <div className="input-group">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy"
            className="form-control"
            placeholderText="Select a date"
          />
 <Button variant='outlined' style={{ marginLeft: "700px" }} onClick={handleTimeModalOpen}>
  Time
</Button>
<Modal
  open={isTimeModalOpen}
  onClose={handleTimeModalClose}
  aria-labelledby="time-modal-title"
  aria-describedby="time-modal-description"
>
  <div style={modalContentStyle}>

    <h3>Set Time</h3>
      <div style={{ marginTop:'20px'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Punch In Time"
            value={punchInTime}
            onChange={handlePunchInTimeChange}
          />
        </LocalizationProvider>
      </div>
      <div style={{ marginTop:"10px", marginBottom:'10px'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Punch Out Time"
            value={punchOutTime}
            onChange={handlePunchOutTimeChange}
          />
        </LocalizationProvider>
      </div>
      
      <Button variant='contained' onClick={handleSubmit}>Submit</Button>

  </div>
</Modal>



          {/* <Button variant='contained' style={{ marginLeft: "20px" }}> Mark All Absent As Present</Button> */}
          <Button variant='contained' style={{ marginLeft: "20px" }}> <ArrowDownwardIcon style={{ marginRight: '5px' }} /> Daily Report
          </Button>

          <div className="container px-0 mx-0" style={{ display: 'flex', marginTop: '40px', flexDirection: 'row', marginLeft: '0px' }}>
            <div className="box" style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }} onClick={() => toggleView('present')}>
              <div className='boxs' style={{ fontSize: '40px', textAlign: 'center' }}>
                {data ? data.present.count : '0'}
                <div style={{ fontSize: '15px', marginTop: '5px' }}>
                  <span className="dot"></span> Present
                </div>
              </div>
            </div>
            <div className="box" style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
              <div className='boxs' style={{ fontSize: '40px', textAlign: 'center' }} onClick={() => toggleView('absent')}>
                {data ? data.absent.count : '0'}
                <div style={{ fontSize: '15px', marginTop: '5px' }}>
                  <span className="dot" style={{ backgroundColor: '#e53935' }}></span> Absent
                </div>
              </div>
            </div>
            <div className="box" style={{ flex: 1, textAlign: 'center',  cursor:'pointer' }} onClick={() => setIsTableVisible(!isTableVisible)}>
              <div className='boxs' style={{ fontSize: '40px', textAlign: 'center' }}>      {lateCountData.lateCount}
                <div style={{ fontSize: '15px', marginTop: '5px' }}>
                  <span className="dot" style={{ backgroundColor: '#00e676' }}></span> Late
                </div>
              </div>
            </div>
            <div className="box" style={{ flex: 1, textAlign: 'center', cursor:'pointer' }}>
              <div className='boxs' style={{ fontSize: '40px', textAlign: 'center' }}> 0
                <div style={{ fontSize: '15px', marginTop: '5px' }}>
                  <span className="dot" style={{ backgroundColor: '#f57c00' }}></span> Half Day
                </div>
              </div>
            </div>
            <div className="box" style={{ flex: 1, textAlign: 'center', }}>
              <div className='boxs' style={{ fontSize: '40px', textAlign: 'center', borderRight: 'none' }}> 0
                <div style={{ fontSize: '15px', marginTop: '5px' }}>
                  <span className="dot" style={{ backgroundColor: '#ba68c8' }}></span> Paid Leave
                </div>
              </div>
            </div>
          </div>
          <div className='tabs' >
            {/* <TextField
  size="small"
  style={{ borderRadius: '5px', width: '300px', height: '80px' }}
  type="text"
  className="form-control"
  placeholder="Search..."
/>

          <Button variant="contained"    style={{ marginLeft:'2px', height:'38px'}}>Search</Button> */}
  {/* {isTableVisible && (
      <div>
        
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Punch In Time</th>
              <th>Punch Out Time</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(groupedLateCounts).map((employeeData, index) => (
              <tr key={index}>
                <td>{employeeData.name}</td>
                <td>{employeeData.punchInTime}</td>
                <td>{employeeData.punchOutTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )} */}

            <div className="table-container" style={{}}>
              <div className="table-scroll">
                {view === 'present' && data && data.present && data.present.employees && data.present.employees.length > 0 && (
                  <div>
                    <div className='tab'>
                      <table style={{ width: '100%', marginLeft: '0px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)' }}>
                        <colgroup>
                          <col style={{ width: '10%' }} /> {/* Adjust the width as needed */}
                          <col /> {/* The remaining columns take the remaining width */}
                        </colgroup>
                        <tr style={{ paddingTop: '20px', fontSize: '20px' }}>
                          <th className="th" style={{ borderLeft: '0.5px solid #e0e0e0' }}>Name</th>
                          <th className="th">Punch In</th>
                          <th className="th">Punch Out</th>
                          <th className="th" style={{ borderRight: '0.5px solid #e0e0e0' }}>Status</th>
                        </tr>
                        {data.present.employees.map((employee, index) => (
                          <tr key={index} style={{ borderBottom: 'none', borderLeft: '0.5px solid #e0e0e0' }}>
                            <td className="td fixed-column" style={{ cursor: 'pointer', color: '#1976d2', width: '150px' }} title={employee.name}>
                              {employee.name}
                            </td>
                            <td className="ant-table-cell" style={{ borderRight: '0.5px solid #e0e0e0' }}>
                              {employee.punchIn}
                            </td>
                            <td className="ant-table-cell" style={{ borderRight: '0.5px solid #e0e0e0', borderLeft: '0.5px solid #e0e0e0' }}>
                              {employee.punchOut}
                            </td>
                            <td className="td" style={{ borderRight: '0.5px solid #e0e0e0' }}>
                              <Button
                                variant="outlined"
                                style={{ margin: '0 5px', borderRadius: '20px', backgroundColor: 'green', borderColor: 'green', color: 'white' }}
                                onClick={toggleDrawer(true)}
                                endIcon={<i className="fas fa-caret-down" style={{ paddingLeft: '5px' }}></i>}
                              >
                                Present
                              </Button>

                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                )}

                {view === 'absent' && data && data.absent && data.absent.employees && data.absent.employees.length > 0 && (
                  <div className='tabss'>

                    <table style={{ width: '100%', marginLeft: '0px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)' }}>
                      <colgroup>
                        <col style={{ width: '10%' }} /> {/* Adjust the width as needed */}
                        <col /> {/* The remaining columns take the remaining width */}
                      </colgroup>
                      <tr style={{ paddingTop: '20px', fontSize: '20px' }}>
                        <th className="th" style={{ borderLeft: '0.5px solid #e0e0e0' }}>Name</th>
                        <th className="th">Punch In</th>
                        <th className="th">Punch Out</th>
                        <th className="th" style={{ borderRight: '0.5px solid #e0e0e0' }}>Status</th>
                      </tr>
                      {data.absent.employees.map((employee, index) => (
                        <tr key={index} style={{ borderBottom: 'none', borderLeft: '0.5px solid #e0e0e0' }}>
                          <td className="td fixed-column" style={{ cursor: 'pointer', color: '#1976d2', width: '150px' }} title={employee.name}>
                            {employee.name}
                          </td>
                          <td className="ant-table-cell" style={{ borderRight: '0.5px solid #e0e0e0' }}>
                            {employee.punchIn}
                          </td>
                          <td className="ant-table-cell" style={{ borderRight: '0.5px solid #e0e0e0', borderLeft: '0.5px solid #e0e0e0' }}>
                            {employee.punchOut}
                          </td>
                          <td className="td" style={{ borderRight: '0.5px solid #e0e0e0' }}>
                            <Button
                              variant="outlined"
                              style={{ margin: '0 5px', borderRadius: '20px', backgroundColor: '#f44336', borderColor: '#f44336', color: 'white' }}
                              onClick={toggleDrawer(true)}
                              endIcon={<i className="fas fa-caret-down" style={{ paddingLeft: '5px' }}></i>}
                            >
                              Absent
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                )}


                <Drawer
                  anchor="right"
                  open={isDrawerOpen}
                  onClose={toggleDrawer(false)} /* Close the drawer when needed */
                >
                  {drawerContent}
                </Drawer>
                
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}

export default Emp;
