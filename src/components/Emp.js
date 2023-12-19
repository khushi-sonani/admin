import React, { useState , useEffect} from 'react';
import Sidebar from './Sidebar';
import './emp.css';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Swal from 'sweetalert2'; // Import SweetAlert
import { TextField } from '@mui/material';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function Emp() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {

    console.log('Search Query:', searchQuery);
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
      cancelButtonColor: '#3085D6',
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
  

  return (
    <div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div style={{ marginLeft: '300px', marginTop:'50px' }}>
        <div>
        <TextField
  size="small"
  style={{ borderRadius: '5px', width: '300px', height: '80px' }}
  type="text"
  placeholder="Search..."
  value={searchQuery}
  onChange={handleSearchInputChange}
/>

          <Button variant="contained"    style={{ marginLeft:'2px', height:'38px'}} onClick={handleSearch}>Search</Button>

          <FormControl variant="outlined" style={{ height: '70px', width: '200px', marginLeft:'40px' }}>
        <InputLabel id="branch-select-label" style={{ marginTop: '-12px', height:'30x' }}>
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

      <FormControl variant="outlined" style={{ height: '30px', width: '200px', marginLeft: '10px' }}>
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
    
        </div>
      

        <div className="table-container" style={{ marginTop: '10px',   }}>
  <div className="table-scroll">
    <table style={{ width: '90%', marginLeft: '0px',boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)'}}>
      <colgroup>
        <col style={{ width: '10%' }} /> {/* Adjust the width as needed */}
        <col /> {/* The remaining columns take the remaining width */}
      </colgroup>
      <tr style={{ paddingTop: '20px', fontSize: '20px', borderLeft:' 0.5px solid #e0e0e0 ' }}>
        <th className="th">Name</th>
        <th className="th">Email id</th>
        <th className="th">Mobile No</th>
        <th className="th">Action</th>
      </tr>
      {users.map((user, index) => (
        <tr key={user.id} style={{ borderLeft:' 0.5px solid #e0e0e0 '}}>
          <td className="td fixed-column" style={{ cursor: 'pointer', color: '#1976d2' }} title={user.name}>
            {user.name}
          </td>
          <td className="td">{user.email}</td>
          <td className="td">{user.mobileNo}</td>
          <td className="td">
            {/* <Button variant="outlined" style={{ margin: '0 5px', borderRadius:'20px' }}>
              <i className="fas fa-calendar" style={{ paddingRight:'5px'}}></i> Attendance
            </Button> */}
            <Button onClick={() => { console.log(user); handleDelete(user.empid); }}   variant="outlined" style={{ margin: '0 5px',  borderRadius:'20px' }}>
              <i className="fas fa-trash"  style={{ paddingRight:'5px',}}></i> Delete
            </Button>
            
            <Button  onClick={() => openPopup(user.empid, user.mobileNo, user.address, user.email)} variant="outlined" style={{ margin: '0 5px', color:'black' ,  borderRadius:'20px', borderColor:'black'}}>
              <i className="fas fa-edit"  style={{ paddingRight:'5px', color:'black'}}></i> Edit
            </Button>
          </td>
        </tr>
      ))}
    </table>
    <Dialog open={isOpen} onClose={closePopup} sx={{ left: '50%', transform: 'translateX(-50%)' }}>
          <DialogTitle>Update Employee</DialogTitle>
          <DialogContent sx={{ marginTop: '20px', width: '350px' }}>
            <TextField
              id="outlined-basic"
              label="Mobile No"
              value={updatedMobileNo}
              onChange={(e) => setUpdatedMobileNo(e.target.value)}
              variant="outlined"
              style={{ marginBottom: '20px', marginTop: '10px', width: '280px' }}
            />
            <TextField
              id="outlined-basic"
              label="Address"
              value={updatedAddress}
              onChange={(e) => setUpdatedAddress(e.target.value)}
              variant="outlined"
              style={{ marginBottom: '20px', width: '280px' }}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              variant="outlined"
              style={{ width: '280px' }}
            />
            <input
              type="hidden"
              value={editingempid}
              onChange={(e) => setUpdateData({ ...updateData, empid: e.target.value })}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button
                variant="contained"
                style={{
                  height: '50px',
                  width: '100px',
                  backgroundColor: '#4F5CD7',
                  border: '10px',
                  borderRadius: '5px',
                }}
                onClick={closePopup}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{
                  height: '50px',
                  width: '100px',
                  backgroundColor: '#4F5CD7',
                  border: '10px',
                  marginLeft: '1px',
                  borderRadius: '5px',
                }}
                onClick={updateUser}
              >
                Update
              </Button>
            </div>
          </DialogContent>
        </Dialog>
  </div>
</div>

</div>
    </div>
  );
}

export default Emp;
