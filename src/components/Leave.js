import React, { useState, useEffect } from 'react';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';

function LeaveRequests() {
  const [empid, setEmpid] = useState('');
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [requestIdToApprove, setRequestIdToApprove] = useState('');
  const [requestIdToReject, setRequestIdToReject] = useState('');
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
  
          // Filter out leave requests older than 5 days
          const currentDate = new Date();
          const filteredLeaveRequests = data.leaveRequests.filter((request) => {
            const applyDate = new Date(request.applydate);
            const daysDifference = Math.floor((currentDate - applyDate) / (24 * 60 * 60 * 1000));
            return daysDifference <= 5;
          });
  
          setLeaveRequests(filteredLeaveRequests);
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
    setRequestIdToApprove(requestId); // Set requestIdToApprove to the selected ID
    setRequestIdToReject(requestId); // Set requestIdToReject to the selected ID
  };
  

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRequestId(null);
  };

 const handleApprove = async () => {
  if (!requestIdToApprove) {
    setMessage('Please select a request to approve.');
    return;
  }

  try {
    const selectedRequest = leaveRequests.find((request) => request._id === requestIdToApprove);
    if (selectedRequest) {
      const empidToApprove = selectedRequest.empid;

      // Log the empid to the console
      console.log('Selected empid to approve:', empidToApprove);

      const response = await fetch(`https://attendance-backend-five.vercel.app/leave/leaverequest/${empidToApprove}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved', empid: empidToApprove }),
      });

      if (response.ok) {
        setMessage('Leave request approved successfully.');
        // You may want to update the status of the request in leaveRequests here
      } else {
        const errorData = await response.json();
        setMessage(`Failed to approve the leave request: ${errorData.message}`);
      }
    }
  } catch (error) {
    setMessage('An error occurred while approving the leave request.');
  }
};

const handleReject = async () => {
  if (!requestIdToReject) {
    setMessage('Please select a request to reject.');
    return;
  }
console.log("handleReject",handleReject)
  try {
    const selectedRequest = leaveRequests.find((request) => request._id === requestIdToReject);
    if (selectedRequest) {
      const empidToReject = selectedRequest.empid;

      // Log the empid to the console
      console.log('Selected empid to reject:', empidToReject);

      const response = await fetch(`https://attendance-backend-five.vercel.app/leave/leaverequest/${empidToReject}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected', empid: empidToReject }),
      });

      if (response.status === 200) {
        setMessage('Leave request rejected successfully.');
        // You may want to update the status of the request in leaveRequests here
      } else {
        setMessage('Failed to reject the leave request.');
      }
    }
  } catch (error) {
    setMessage('An error occurred while rejecting the leave request.');
  }
};

  

 
  
  return (
    <div>
      {/* <input
        type="text"
        placeholder="Enter Employee ID"
        value={empid}
        onChange={(e) => setEmpid(e.target.value)}
      />
      <button onClick={fetchLeaveRequests}>Fetch Leave Requests</button> */}
      <div>{message}</div>
      <h1>Leave Requests</h1>
      <table>
        <thead>
          <tr>
            <th>Emp id</th>
            <th>From date</th>
            <th>TO date</th>
            <th>Leave type</th>
            <th>Reason of leave</th>
            <th>Status</th>
            <th>Apply Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.empid}</td>
              <td>{request.fromdate}</td>
              <td>{request.todate}</td>
              <td>{request.leavetype}</td>
              <td>{request.reasonofleave}</td>
              <td>{request.status}</td>
              <td>{request.applydate}</td>
              <td>
                <IconButton
                  aria-label="more"
                  aria-haspopup="true"
                  onClick={(e) => handleMenuOpen(e, request._id)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={selectedRequestId === request._id}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleApprove}>
                    <DoneOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />
                    Approve
                  </MenuItem>
                  <MenuItem onClick={handleReject}>
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
