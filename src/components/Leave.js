import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';

function LeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // State for anchor element
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://attendance-backend-five.vercel.app/leave/getleave');
        if (response.ok) {
          const data = await response.json();
          console.log(data.leaveRequests);
          setLeaveRequests(data.leaveRequests);
          setLoading(false);
        } else {
          setError('Error fetching leave requests');
          setLoading(false);
        }
      } catch (error) {
        setError('Network error');
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleMenuOpen = (event, requestId) => {
    setAnchorEl(event.currentTarget);
    setSelectedRequestId(requestId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRequestId(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Sidebar/>
      <h1 style={{marginLeft:'300px'}}>Leave Requests</h1>
      <table style={{ marginLeft:'300px', fontSize:'20px'}}>
        <thead>
          <tr>
            <th>Emp id</th>
            <th>From date</th>
            <th>TO date</th>
            <th>Leave type</th>
            <th>Reason of leave</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map(request => (
            <tr key={request._id}>
              <td>{request.empid}</td>
              <td>{request.fromdate}</td>
              <td>{request.todate}</td>
              <td>{request.leavetype}</td>
              <td>{request.reasonofleave}</td>
              <td>
                <IconButton
                  aria-label="more"
                  aria-haspopup="true"
                  onClick={(e) => handleMenuOpen(e, request._id)} // Open the menu on click
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl} // Set the anchor element
                  open={selectedRequestId === request._id} // Open the menu for the selected request
                  onClose={handleMenuClose} // Close the menu
                >
                  <MenuItem onClick={handleMenuClose}>
                    < DoneOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />
                    Approve
                  </MenuItem>
                  <MenuItem className="delete-menu-item" onClick={handleMenuClose}>
                    <CloseIcon fontSize="small" style={{ marginRight: '8px', color: 'red' }} />
                    <span style={{ color: 'red' }}>Reject</span>
                  </MenuItem>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveRequests;
