import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Dropdown from 'react-bootstrap/Dropdown';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import EventIcon from '@mui/icons-material/Event';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';
import Report from './Report';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';


function Notifications() {
  const notificationOptions = ['Attendance', 'Notes', 'Leave Request', 'Announcement'];
  const notificationIcons = [EventIcon, TextSnippetOutlinedIcon, NoPhotographyOutlinedIcon, Report];

  // Set the default selected option to "Notifications"
  const [selectedOption, setSelectedOption] = useState('Notifications');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false); // Close the dropdown when an option is selected
  };

  const divStyle = {
    fontSize: '25px',
    lineHeight: '25px',
    fontFamily: 'Inter',
    fontWeight: 'bolder',
    backgroundColor: 'white',
    maxWidth: '63%',
    margin: '20px auto',
  };

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
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch('https://attendance-backend-five.vercel.app/leave/getleave'); // Replace with the actual API endpoint
        const data = await response.json();

        if (response.ok) {
          setLeaveRequests(data.leaveRequests);
          console.log(data.leaveRequests)
        } else {
          setError(data.message || 'Failed to fetch leave requests');
        }
      } catch (error) {
        setError('Internal server error oucress');
        console.error('Error fetching leave requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
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


  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the current date in the format 'YYYY-MM-DD'
        const currentDate = new Date().toISOString().split('T')[0];

        // Replace 'url_of_your_server' with the actual URL where your server is running
        const apiUrl = `https://attendance-backend-five.vercel.app/punching/matching-mobiles/${currentDate}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData(); // Call the function when the component mounts
  }, []);
  

  return (
    <div style={divStyle} >
      <div className="sidebar">
        <Sidebar />
      </div>
      <div style={{ marginTop: '30px', paddingLeft: '20px', paddingTop: '20px', color: 'black' }}>
        Notifications
      </div>
      <div style={{ display: 'flex', marginLeft: '20px', paddingTop: '30px', paddingBottom: '30px', width: '200px' }}>
        <Dropdown
          show={isDropdownOpen}
          onSelect={handleOptionChange}
          onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
        >
          <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ fontSize: '20px', paddingTop: '5px' }}>
            <NotificationsNoneIcon /> {selectedOption}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ fontSize: '18px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)' }}>
            {notificationOptions.map((option, index) => (
              <Dropdown.Item
                key={option}
                eventKey={option}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {React.createElement(notificationIcons[index], {
                  fontSize: '16px',
                  style: { marginRight: '8px' },
                })}
                {option}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {/* Conditionally render the table if "Leave Request" is selected */}
        {selectedOption === 'Leave Request' && (
            <div className="table-containera" style={{ marginLeft:'15px'}}>
               <h4>{message}</h4>
            <table  style={{ width: '100%', marginLeft: '3px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <thead>
                <tr style={{ paddingTop: '20px', fontSize: '20px' }}>
                  <th>Emp id</th>
                  <th>From date</th>
                  <th>TO date</th>
                  <th>Leave type</th>
                  <th>Reason of leave</th>
                  <th>Apply Date</th>
                  <th>Status</th>
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
                   <td>{new Date(request.applydate).toLocaleDateString()}</td>
                   <td>{request.status}</td>
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
        )}
        <div>
    
  {selectedOption === 'Notes' ? (
    <ul>
      <h1>Chat Messages</h1>
      {chatData.map((message, index) => (
        <li key={index}>{message.addchat}</li>
      ))}
    </ul>
  ) : null}
</div><div>
      
     
      {selectedOption === 'Attendance' ? (
        data ? (
          <table>
            
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile No</th>
                <th>Punch In</th>
                <th>Punch Out</th>
                {/* Add more table headers for additional fields if needed */}
              </tr>
            </thead>
            <tbody>
              {data.data.present.employees.map((employee) => (
                <tr key={employee.mobileNo}>
                  <td>{employee.name}</td>
                  <td>{employee.mobileNo}</td>
                  <td>{employee.punchIn}</td>
                  <td>{employee.punchOut || 'N/A'}</td>
                  {/* Add more table cells for additional fields if needed */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : error ? (
          <p>Error: {error}</p>
        ) : null
      ) : null}
    </div>
    </div>
  );
}

export default Notifications;
