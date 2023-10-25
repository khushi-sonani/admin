import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Swal from 'sweetalert2'; // Import SweetAlert
import './emp.css';
import Sidebar from './Sidebar';

function Emp() {
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

  const handleClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };
  
  return (
    <div>
      <Sidebar />
      <div>
        <h5 style={{ margin: '0 auto', marginLeft: '650px', marginTop: '30px', marginBottom: '20px' }}>
          <b>Employee Data</b>
        </h5>
        <a href='/register'>
          <Button
            variant="contained"
            size="small"
            endIcon={<AddIcon />}
            style={{ float: 'right', marginRight: '390px' }}
          >
            Add User
          </Button>
        </a>
        <table style={{ margin: '0 auto', marginTop: '100px' }}>
          <thead>
            <tr>
              <th>Eid</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{user.empid}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobileNo}</td>
                <td>
                  <IconButton
                    aria-label="more"
                    aria-controls={`long-menu-${user.empid}`}
                    aria-expanded={Boolean(anchorEls[index])}
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, index)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id={`long-menu-${user.empid}`}
                    anchorEl={anchorEls[index]}
                    open={Boolean(anchorEls[index])}
                    onClose={() => handleClose(index)}
                  >
                    <MenuItem onClick={() => openPopup(user.empid, user.mobileNo, user.address, user.email)}>
                      <EditIcon fontSize="small" style={{ marginRight: '8px' }} />
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => { console.log(user); handleDelete(user.empid); }} className="delete-menu-item">
                      <DeleteIcon fontSize="small" style={{ marginRight: '8px', color: 'red' }} />
                      <span style={{ color: 'red' }}>Delete</span>
                    </MenuItem>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
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
                  backgroundColor: '#4f5cd7',
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
                  backgroundColor: '#4f5cd7',
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
  );
}

export default Emp;
