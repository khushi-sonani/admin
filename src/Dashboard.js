import React, { useState, useEffect,  useRef } from 'react';
import './Dashboard.css';
import logo from './logo.jpg'
import { format, parseISO } from 'date-fns';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
function Dashboard() {
    const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
        }
        else{
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };
    const changeStyle1 = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
        }
        else{
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };

    
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

    const toggleSubMenu = () => {
        setIsSubMenuVisible(!isSubMenuVisible);
    };
    const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
 
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
    return (
        <div style={{ height:'100px'}}>
            <body id="page-top">

                {/*  <!-- Page Wrapper --> */}
                <div id="wrapper">

                    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                        {/* Sidebar - Brand */}
                        <a className="sidebar-brand d-flex flex-column align-items-center justify-content-center" href="/company">
                            <img src={logo} alt="logo" className="logo" style={{ marginTop: '100px', height: "70px", width: '70px' }} />
                            <div className="sidebar-brand-text mx-3" style={{ marginTop: '20px' }}>
                                Abcd <sup></sup>
                            </div>
                            <div className="company-code" style={{ fontSize: '11px' }}>company code: xyz</div>
                        </a>

                        {/*  <!-- Divider --> */}
                    

                        {/*  <!-- Nav Item - Dashboard --> */}
                        <li className={`nav-item ${selectedOption === 'myTeam' ? 'selected' : ''}`} style={{ marginTop: '100px' }}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('myTeam')}
                            >
                                <i className="fas fa-fw fa-users" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>MY Team</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'employees' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('employees')}
                            >
                                <i className="fas fa-fw fa-user" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Employees</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'attendance' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('attendance')}
                            >
                                <i className="fas fa-fw fa-fingerprint" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Attendance</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'report' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('report')}
                            >
                                <i className="fas fa-fw fa-file" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Report</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'notification' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('notification')}
                            >
                                <i className="fas fa-fw fa-bell" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Notification</span>
                            </a>
                        </li>
                        <li className={`nav-item`} >
                            <a
                                className={`nav-link clickable ${selectedOption === 'calculateSalary' ? 'selected' : ''}`}
                                onClick={toggleSubMenu}
                            >
                                <i className="fas fa-fw fa-rupee-sign" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Calculate Salary</span>
                            </a>
                            {isSubMenuVisible && (
                                <ul className="sub-menu">
                                    <li className={`nav-item ${selectedOption === 'pending' ? 'selected' : ''}`}>
                                        <a
                                            className="nav-link"
                                            href="calculate-salary/pending"
                                            onClick={() => setSelectedOption('pending')}
                                        >
                                            <i className="fas fa-fw fa-clock" style={{ fontSize: '15px', marginRight: '8px' }}></i>
                                            <span style={{ fontSize: '15px' }}>Pending</span>
                                        </a>
                                    </li>
                                    <li className={`nav-item ${selectedOption === 'finalize' ? 'selected' : ''}`}>
                                        <a
                                            className="nav-link"
                                            href="calculate-salary/finalize"
                                            onClick={() => setSelectedOption('finalize')}
                                        >
                                            <i className="fas fa-fw fa-check-circle" style={{ fontSize: '15px', marginRight: '8px' }}></i>
                                            <span style={{ fontSize: '15px' }}>Finalize</span>
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className={`nav-item ${selectedOption === 'addPayment' ? 'selected' : ''}`} >
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('addPayment')}
                            >
                                <i className="fas fa-fw fa-credit-card" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Add Payment</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'payEmployees' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('payEmployees')}
                            >
                                <i className="fas fa-fw fa-coins" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Pay Employees</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'liveLocation' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('liveLocation')}
                            >
                                <i className="fas fa-fw fa-map-marker-alt" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Live Location</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'documents' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('documents')}
                            >
                                <i className="fas fa-fw fa-file-alt" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Documents</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'settings' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('settings')}
                            >
                                <i className="fas fa-fw fa-cog" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Settings</span>
                            </a>
                        </li>
                    </ul>
                 
                    <div style={{  fontSize: '23px', color: 'black', marginTop: '10px' }}>
  <b style={{ marginLeft:'40px'}}>My Team</b>
  <hr style={{ margin: '0', borderColor: '#eeeeee', width:'1320px', marginLeft:'0px', marginTop:'10px' }} />
  <Box sx={{ width: '100%', marginLeft:'20px', marginTop:'20px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ fontSize:'2px'}}>
          <Tab label="Staff Details" {...a11yProps(0)} style={{ marginRight:'25px'}}/>
          <Tab label="Attebdance  Details" {...a11yProps(1)}  style={{ marginRight:'25px'}}/>
          <Tab label="bank  Details" {...a11yProps(2)} style={{ marginRight:'25px'}} />
          <Tab label="salary Details" {...a11yProps(3)}  style={{ marginRight:'25px'}}/>
          <Tab label="Leave Balances & Policy" {...a11yProps(4)} style={{ marginRight:'25px'}} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
    <input type="text" placeholder="Search Staff" className="search-input" style={{ marginRight: '10px' }} />
    <FormControl variant="outlined" style={{ height: '30px', width:'150px' }}>
        <InputLabel
          id="branch-select-label"
          style={{ marginTop: '-12px' }}
        >
          All Branches
        </InputLabel>
        <Select
          labelId="branch-select-label"
          id="branch-select"
          value={selectedOption}
          onChange={handleOptionChange}
          label="All Branches"
          style={{ height: '30px' }}
        >
          <MenuItem value="">Select an option</MenuItem>
          <MenuItem value="branch1">Branch 1</MenuItem>
          <MenuItem value="branch2">Branch 2</MenuItem>
          <MenuItem value="branch3">Branch 3</MenuItem>
        </Select>
      </FormControl>    
      <FormControl variant="outlined" style={{ height: '30px', width:'150px', marginLeft:'10px' }}>
        <InputLabel
          id="branch-select-label"
          style={{ marginTop: '-12px' }}
        >
          Active Staff
        </InputLabel>
        <Select
          labelId="branch-select-label"
          id="branch-select"
          value={selectedOption}
          onChange={handleOptionChange}
          label="All Branches"
          style={{ height: '30px' }}
        >
          <MenuItem value="">Select an option</MenuItem>
          <MenuItem value="branch1">All staff</MenuItem>
          <MenuItem value="branch2"> Active Staff</MenuItem>
          <MenuItem value="branch3"> Inactive Staff</MenuItem>
        </Select>
      </FormControl>       
      <Button variant="outlined" style={{ marginLeft:'400px', marginRight:'40px', height:'30px',  width:'150px'}}>Update  Staff</Button>      
      <Button variant="contained" style={{ height:'30px', width:'150px'}}>Add Staff</Button>
                      
  </div>
</div>

  
</CustomTabPanel>



      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item four
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Item five
      </CustomTabPanel>
    </Box>
</div>


                                </div>
            </body>
        </div>
    )
}

export default Dashboard;
