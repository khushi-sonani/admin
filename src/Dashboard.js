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
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';


import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Swal from 'sweetalert2'; 


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
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleStaffChange = (event) => {
    setSelectedStaff(event.target.value);
  };
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [anchorEls, setAnchorEls] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingempid, setEditingEmpId] = useState(null);
  const [updateData, setUpdateData] = useState({});
  const [message, setMessage] = useState('');
  const [updatedMobileNo, setUpdatedMobileNo] = useState('');
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    axios
      .get('https://attendance-backend-five.vercel.app/employeedate')
      .then((response) => {
        console.log(response.data.data);
        setUsers(response.data.data);
      })
      .catch((err) => {
        setError(err.message);
        console.log(error);
        alert('Data could not be fetched');
      });
  }, []);

  const openPopup = (empid, mobileNo, address, email) => {
    setIsOpen(true);
    setEditingEmpId(empid);
    setUpdatedMobileNo(mobileNo);
    setUpdatedAddress(address);
    setUpdatedEmail(email);
  };

  const closePopup = () => {
    setIsOpen(false);
    setEditingEmpId(null);
    setUpdatedMobileNo('');
    setUpdatedAddress('');
    setUpdatedEmail('');
  };
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openEditForm = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const closeEditForm = () => {
    setIsEditing(false);
    setSelectedUser(null);
  };
  const updateUser = async () => {
    try {
      const updatedUserData = {
        mobileNo: updatedMobileNo,
        address: updatedAddress,
        email: updatedEmail,
      };

      const response = await fetch(`https://attendance-backend-five.vercel.app/company/${editingempid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.status === 200) {
        const updatedData = await response.json();
        console.log('Updated Data:', updatedData);
        closePopup();
        // Show SweetAlert on success with an "OK" button
        Swal.fire({
          icon: 'success',
          title: 'Data updated successfully',
          showConfirmButton: true, // Show the "OK" button
          confirmButtonText: 'OK', // Customize the text on the "OK" button
      
        });
      } else {
        alert('Data could not be updated');
      }
    } catch (error) {
      console.error(`Error updating user data: ${error.message}`);
      alert('Data could not be updated');
    }
  };

 
  const handleDelete = async (empidToDelete) => {
    console.log('Selected empid to delete:', empidToDelete);
  
    const confirmDelete = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });
  
    if (confirmDelete.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://attendance-backend-five.vercel.app/company/${empidToDelete}`
        );
  
        if (response.status === 200) {
          setDeleteMessage('Employee deleted successfully');
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.empid !== empidToDelete)
          );
          console.log('Employee is deleted');
        } else {
          setDeleteMessage('Employee not found');
        }
      } catch (err) {
        console.error(`Error deleting employee: ${err.message}`);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while deleting the employee.',
        });
      }
    }
  }
  
  
  useEffect(() => {
    setAnchorEls(users.map(() => null));
  }, [users]);

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

 

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    // Implement your search logic here, e.g., filter the staff based on the search term.
    // You might want to fetch data from an API or filter an existing list of staff members.
    console.log('Search Term:', value);
  };
 
  
  const [bankData, setBankData] = useState([]);
 

  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const response = await fetch('https://attendance-backend-five.vercel.app/empbankdetail/bank');
        const data = await response.json();

        if (response.ok) {
          setBankData(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Internal Server Error');
      } finally {
       
      }
    };

    fetchBankData();
  }, []);

  const [empidToUpdate, setEmpidToUpdate] = useState('');
  const [updatedUserData, setUpdatedUserData] = useState({
    accountNumber: '',
    bankName: '',
    ifsccode: '',
    holdername: '',
  });
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`https://attendance-backend-five.vercel.app/empbankdetail/bank/${empidToUpdate}`, updatedUserData);
      console.log(response.data);
      handleClose();
      // Handle success, update UI, etc.
    } catch (error) {
      console.error(error.response.data);
      // Handle errors, show error messages, etc.
    }
  };
  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await axios.get('https://attendance-backend-five.vercel.app/salary/salary');
        setSalaryData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching salary data.');
        setLoading(false);
      }
    };
    fetchSalaryData();
  }, []); 


  const [newSalary, setNewSalary] = useState('');
  

  // Function to handle the update
  const handleUpdateSalary = async () => {
    try {
      // Basic validation
      if (!empidToUpdate || !newSalary) {
        setError('EmpID and Salary cannot be empty.');
        return;
      }

      setLoading(true);

      const response = await axios.put(
        `https://attendance-backend-five.vercel.app/salary/salary/${empidToUpdate}`,
        {
          empid: empidToUpdate,
          salary: newSalary,
          // Add other fields as needed
        }
      );

      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };
  
    return (
        <div style={{ height:'100px'}}>
            <body id="page-top">

                <div id="wrapper" >
                <div className="dashboard-container">
            <div className="sidebar">
            <div className="sidebar-content">
                    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    
                        <a className="sidebar-brand d-flex flex-column align-items-center justify-content-center" href="/emp">
                            <img src={logo} alt="logo" className="logo" style={{ marginTop: '100px', height: "70px", width: '70px' }} />
                            <div className="sidebar-brand-text mx-3" style={{ marginTop: '20px' }}>
                                Abcd <sup></sup>
                            </div>
                            <div className="company-code" style={{ fontSize: '11px' }}>company code: xyz</div>
                        </a>

                      
                        <li className={`nav-item ${selectedOption === 'myTeam' ? 'selected' : ''}`} style={{ marginTop: '100px' }}>
                            <a
                                className="nav-link"
                                href=""
                                onClick={() => setSelectedOption('myTeam')}
                            >
                                <i className="fas fa-fw fa-users" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>MY Team</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'employees' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="/emp"
                                onClick={() => setSelectedOption('employees')}
                            >
                                <i className="fas fa-fw fa-user" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Employees</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'attendance' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="/Attendance"
                                onClick={() => setSelectedOption('attendance')}
                            >
                                <i className="fas fa-fw fa-fingerprint" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Attendance</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'report' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="/reportt"
                                onClick={() => setSelectedOption('report')}
                            >
                                <i className="fas fa-fw fa-file" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Report</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'notification' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="/notification"
                                onClick={() => setSelectedOption('notification')}
                            >
                                <i className="fas fa-fw fa-bell" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Notification</span>
                            </a>
                        </li>
                        <li className={`nav-item`}style={{ cursor:'pointer'}}>
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
                                href="/payment"
                                onClick={() => setSelectedOption('addPayment')}
                            >
                                <i className="fas fa-fw fa-credit-card" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Add Payment</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'payEmployees' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href=""
                                onClick={() => setSelectedOption('payEmployees')}
                            >
                                <i className="fas fa-fw fa-coins" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Pay Employees</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'liveLocation' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="/holiday"
                                onClick={() => setSelectedOption('liveLocation')}
                            >
                                <i className="fas fa-fw fa-gift" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Holiday</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'documents' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="/document"
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
                    </div>
                    </div>
                 </div>
                 
                    <div style={{  fontSize: '23px', color: 'black', marginTop: '10px', marginLeft:'220px' }}>
  <b style={{ marginLeft:'40px'}}>My Team</b>
  <hr style={{ margin: '0', borderColor: '#eeeeee', width:'1310px', marginLeft:'0px', marginTop:'10px' }} />
  <Box sx={{ width: '98%', marginLeft:'20px', marginTop:'20px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ fontSize:'2px'}}>
          <Tab label="Staff Details" {...a11yProps(0)} style={{ marginRight:'25px'}}/>
          <Tab label="Attebdance  Details" {...a11yProps(1)}  style={{ marginRight:'25px'}}/>
          <Tab label="bank  Details" {...a11yProps(2)} style={{ marginRight:'25px'}} />
          <Tab label="salary Details" {...a11yProps(3)}  style={{ marginRight:'25px'}}/>
          <Tab label="Leave Balances & Policy" {...a11yProps(4)} style={{ marginRight:'25px'}} />
        </Tabs>
      </Box>
      {/* emp details */}
      <CustomTabPanel value={value} index={0}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
    
    <input type="text" placeholder="Search Staff" className="search-input" style={{ marginRight: '10px' }} />
    <FormControl variant="outlined" style={{ height: '30px', width: '170px' }}>
        <InputLabel id="branch-select-label" style={{ marginTop: '-12px' }}>
          All Branches
        </InputLabel>
        <Select
          labelId="branch-select-label"
          id="branch-select-branch"
          value={selectedBranch}
          onChange={handleBranchChange}
          label="All Branches"
          style={{ height: '30px' }}
        >
          <MenuItem value="">Select an option</MenuItem>
          <MenuItem value="branch1">Branch 1</MenuItem>
          <MenuItem value="branch2">Branch 2</MenuItem>
          <MenuItem value="branch3">Branch 3</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" style={{ height: '30px', width: '170px', marginLeft: '10px' }}>
        <InputLabel id="staff-select-label" style={{ marginTop: '-12px' }}>
          Active Staff
        </InputLabel>
        <Select
          labelId="staff-select-label"
          id="branch-select-staff"
          value={selectedStaff}
          onChange={handleStaffChange}
          label="Active Staff"
          style={{ height: '30px' }}
        >
          <MenuItem value="">Select an option</MenuItem>
          <MenuItem value="allStaff">All staff</MenuItem>
          <MenuItem value="activeStaff">Active Staff</MenuItem>
          <MenuItem value="inactiveStaff">Inactive Staff</MenuItem>
        </Select>
      </FormControl>      
      <Button
        variant="outlined"
        style={{ marginLeft: '360px', marginRight: '40px', height: '30px', width: '150px' }}
  
      >
        Time Report
      </Button>
      <Link to="/register">
                <Button variant="contained" style={{ height: '30px', width: '150px' }}>
                    Add Staff
                </Button>
            </Link>
         
                      
  </div>
</div>
<div className="table-container" style={{ marginTop:'50px'}}>
  <div className="table-scroll">
    <table style={{ width: '100%', marginLeft: '0px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <colgroup>
        <col style={{ width: '10%' }} /> {/* Adjust the width as needed */}
        <col /> {/* The remaining columns take the remaining width */}
      </colgroup>
      <tr style={{ paddingTop: '20px', fontSize: '20px' }}>
        <th className="th">Name</th>
        <th className="th">Email</th>
        <th className="th">Emp Id</th>
        <th className="th">Mobile No</th>
        <th className="th">Address</th>
        <th className="th">Pan card</th>
        <th className="th">Adhar</th>
        <th className="th">Gender</th> {/* Add the new field here */}
      </tr>
      {users.map((user, index) => (
        <tr key={user.id}>
          <td className="td">
        {user.name}
    </td>
          <td className="td" >{user.email}</td>
          <td  className="td">{user.empid}</td>
          <td className="td">{user.mobileNo}</td>
          <td className="td">{user.address}</td>
          <td className="td">{user.pannumber}</td>
          <td className="td">{user.adharnumber}</td>
          <td className="td" style={{ }}>{user.gender}</td>
        </tr>
      ))}
    </table>
  </div>
</div>

  
</CustomTabPanel>

{/* attendance details */}
 <CustomTabPanel value={value} index={1}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
    
    <input type="text" placeholder="Search Staff" className="search-input" style={{ marginRight: '10px' }} />
    <FormControl variant="outlined" style={{ height: '30px', width: '170px' }}>
        <InputLabel id="branch-select-label" style={{ marginTop: '-12px' }}>
          All Branches
        </InputLabel>
        <Select
          labelId="branch-select-label"
          id="branch-select-branch"
          value={selectedBranch}
          onChange={handleBranchChange}
          label="All Branches"
          style={{ height: '30px' }}
        >
          <MenuItem value="">Select an option</MenuItem>
          <MenuItem value="branch1">Branch 1</MenuItem>
          <MenuItem value="branch2">Branch 2</MenuItem>
          <MenuItem value="branch3">Branch 3</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" style={{ height: '30px', width: '170px', marginLeft: '10px' }}>
        <InputLabel id="staff-select-label" style={{ marginTop: '-12px' }}>
          Active Staff
        </InputLabel>
        <Select
          labelId="staff-select-label"
          id="branch-select-staff"
          value={selectedStaff}
          onChange={handleStaffChange}
          label="Active Staff"
          style={{ height: '30px' }}
        >
          <MenuItem value="">Select an option</MenuItem>
          <MenuItem value="allStaff">All staff</MenuItem>
          <MenuItem value="activeStaff">Active Staff</MenuItem>
          <MenuItem value="inactiveStaff">Inactive Staff</MenuItem>
        </Select>
      </FormControl>   
      <Link to="/atd">   
      <Button variant="outlined" style={{ marginLeft:'360px', marginRight:'40px', height:'30px',  width:'200px'}}>Add Attendance</Button>      
      </Link>
         
                      
  </div>
</div>
<div className="table-container" style={{ marginTop:'50px'}}>
  <div className="table-scroll">
    <table style={{ width: '50%', marginLeft: '0px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <colgroup>
        <col style={{ width: '10%' }} /> 
        <col />
      </colgroup>
      <tr style={{ paddingTop: '20px', fontSize: '20px' }}>
        <th className="th">Emp ID</th>
        <th className="th">working Hours</th>
        <th className="th"> working Days</th>
        
        
      </tr>
      {users.map((user, index) => (
        <tr key={user.id}>
         
          <td className="td">{user.empid}</td>
          <td className="td">{user.status}</td>
          <td className="td">{user.job}</td>
        
        </tr>
      ))}
    </table>
  </div>
</div>

      </CustomTabPanel>

      {/* bank details */}
      <CustomTabPanel value={value} index={2}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
    
  <input
      type="text"
      placeholder="Search Staff"
      className="search-input"
      style={{ marginRight: '10px' }}
      value={searchTerm}
      onChange={handleSearch}
    />

    <FormControl variant="outlined" style={{ height: '30px', width: '190px' }}>
        <InputLabel id="branch-select-label" style={{ marginTop: '-12px' }}>
          All Branches
        </InputLabel>
        <Select
          labelId="branch-select-label"
          id="branch-select-branch"
          value={selectedBranch}
          onChange={handleBranchChange}
          label="All Branches"
          style={{ height: '30px' }}
        >
          <MenuItem value="">Select an option</MenuItem>
          <MenuItem value="branch1">Branch 1</MenuItem>
          <MenuItem value="branch2">Branch 2</MenuItem>
          <MenuItem value="branch3">Branch 3</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" style={{ height: '30px', width: '170px', marginLeft: '10px' }}>
        <InputLabel id="staff-select-label" style={{ marginTop: '-12px' }}>
          Active Staff
        </InputLabel>
        <Select
          labelId="staff-select-label"
          id="branch-select-staff"
          value={selectedStaff}
          onChange={handleStaffChange}
          label="Active Staff"
          style={{ height: '30px' }}
        >
          <MenuItem value="">Select an option</MenuItem>
          <MenuItem value="allStaff">All staff</MenuItem>
          <MenuItem value="activeStaff">Active Staff</MenuItem>
          <MenuItem value="inactiveStaff">Inactive Staff</MenuItem>
        </Select>
      </FormControl> 
      <Link to="/bank">
     
      <Button variant="outlined" style={{ marginLeft:'300px', marginRight:'40px', height:'30px',  width:'200px', marginTop:'0px'}}  >Add  Bank Details</Button> 
      </Link>
      <Button variant="contained"  style={{ height:'30px',  width:'300px', marginTop:'0px'}} onClick={handleClickOpen} >Update  Bank Details</Button>
      <Dialog
  open={isDialogOpen}
  onClose={handleClose}
  maxWidth="md"
  PaperProps={{
    style: {
      width: '30%',
      maxWidth: 'none',
    },
  }}
>
  <DialogTitle  style={{ textAlign: 'center' }} >Update User Information</DialogTitle>
  <DialogContent style={{ textAlign: 'center' }}>
  <TextField
            label="EmpID"
            type="text"
            value={empidToUpdate}
            onChange={(e) => setEmpidToUpdate(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Account Number"
            type="text"
            value={updatedUserData.accountNumber}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, accountNumber: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Bank Name"
            type="text"
            value={updatedUserData.bankName}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, bankName: e.target.value })}
            margin="normal"
          />
          <TextField
            label="IFSC Code"
            type="text"
            value={updatedUserData.ifsccode}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, ifsccode: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Holder Name"
            type="text"
            value={updatedUserData.holdername}
            onChange={(e) => setUpdatedUserData({ ...updatedUserData, holdername: e.target.value })}
            margin="normal"
          />
</DialogContent>

  <DialogActions style={{ justifyContent: 'center' }}>
    <Button variant="contained" onClick={handleClose}>Cancel</Button>
    <Button variant="contained" onClick={handleUpdateUser}>Update User</Button>
  </DialogActions>
</Dialog>

    
    
         
                      
  </div>
</div>
<div className="table-container" style={{ marginTop:'50px'}}>
  <div className="table-scroll">
    <table style={{ width: '100%', marginLeft: '0px' , boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}>
      <colgroup>
        <col style={{ width: '10%' }} /> {/* Adjust the width as needed */}
        <col /> {/* The remaining columns take the remaining width */}
      </colgroup>
      <tr style={{ paddingTop: '20px', fontSize: '20px' }}>
      <th className="th">Employee ID</th>
      <th className="th">Account Number</th>
          <th className="th">Bank Name</th>
          <th className="th">IFSC Code</th>
          <th className="th">Holder Name</th>
          
  
      </tr>
      {bankData.map((bankRecord) => (
            <tr key={bankRecord._id}>
               <td className="td">{bankRecord.empid}</td>
              <td className="td">{bankRecord.accountNumber}</td>
              <td className="td">{bankRecord.bankName}</td>
              <td className="td">{bankRecord.ifsccode}</td>
              <td className="td">{bankRecord.holdername}</td>
             
            </tr>
          ))}

    
    </table>
  </div>
</div>

      </CustomTabPanel>

      {/* salary details */}
      <CustomTabPanel value={value} index={3}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
    
    <input type="text" placeholder="Search Staff" className="search-input" style={{ marginRight: '10px' }} />
    <FormControl variant="outlined" style={{ height: '30px', width: '170px' }}>
        <InputLabel id="branch-select-label" style={{ marginTop: '-12px' }}>
          All Branches
        </InputLabel>
        <Select
          labelId="branch-select-label"
          id="branch-select-branch"
          value={selectedBranch}
          onChange={handleBranchChange}
          label="All Branches"
          style={{ height: '30px' }}
        >
          <MenuItem value="">Select an option</MenuItem>
          <MenuItem value="branch1">Branch 1</MenuItem>
          <MenuItem value="branch2">Branch 2</MenuItem>
          <MenuItem value="branch3">Branch 3</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" style={{ height: '30px', width: '170px', marginLeft: '10px' }}>
        <InputLabel id="staff-select-label" style={{ marginTop: '-12px' }}>
          Active Staff
        </InputLabel>
        <Select
          labelId="staff-select-label"
          id="branch-select-staff"
          value={selectedStaff}
          onChange={handleStaffChange}
          label="Active Staff"
          style={{ height: '30px' }}
        >
          <MenuItem value="">Select an option</MenuItem>
          <MenuItem value="allStaff">All staff</MenuItem>
          <MenuItem value="activeStaff">Active Staff</MenuItem>
          <MenuItem value="inactiveStaff">Inactive Staff</MenuItem>
        </Select>
      </FormControl>   
      <Link to="/salary">   
      <Button variant="outlined" style={{ marginLeft:'320px', marginRight:'40px', height:'30px',  width:'200px'}}>Add  Salary </Button>      
    </Link>
    <Button variant="contained"  onClick={handleClickOpen}  style={{ marginLeft:'2px', height:'30px',  width:'200px'}}>Update  Salary </Button>      
    <Dialog
      open={isDialogOpen}
      onClose={handleClose}
      maxWidth="md"
      PaperProps={{
        style: {
          width: '30%',
          maxWidth: 'none',
        },
      }}
    >
      <DialogTitle style={{ textAlign: 'center' }}>Update User Information</DialogTitle>
      <DialogContent style={{ textAlign: 'center' }}>
        <TextField
          label="EmpID"
          type="text"
          value={empidToUpdate}
          onChange={(e) => setEmpidToUpdate(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Salary"
          type="text"
          value={newSalary}
          onChange={(e) => setNewSalary(e.target.value)}
          margin="normal"
        />
      </DialogContent>

      <DialogActions style={{ justifyContent: 'center' }}>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleUpdateSalary} disabled={loading}>
          {loading ? 'Updating...' : 'Update Salary'}
        </Button>
      </DialogActions>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Dialog> 
                      
  </div>
</div>
<div className="table-container" style={{ marginTop:'50px'}}>
  <div className="table-scroll">
    <table style={{ width: '30%', marginLeft: '0px' , boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}>
      <colgroup>
        <col style={{ width: '10%' }} /> {/* Adjust the width as needed */}
        <col /> {/* The remaining columns take the remaining width */}
      </colgroup>
      <tr style={{ paddingTop: '20px', fontSize: '20px' }}>
        <th className="th">Emp Id</th>
        <th className="th">salary</th>
       
      </tr>
      {salaryData.map((item) => (
          <tr key={item._id}>
            <td  className="td">{item.empid}</td>
            <td  className="td">{item.salary}</td>
          </tr>
        ))}
    </table>
  </div>
</div>
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
