import React, { useState, useEffect } from 'react';

function LeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://attendance-backend-five.vercel.app/leave/getleave'); // Replace with your actual API endpoint
        if (response.ok) {
          const data = await response.json();
          setLeaveRequests(data.leaveRequests);
          setLoading(false);
          alert('')
        } else {
          setError('Error fetching leave requests');
          setLoading(false);
          alert('error in fetch')
        }
      } catch (error) {
        setError('Network error');
        setLoading(false);
        alert('error')
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Leave Requests</h1>
      <ul>
        {leaveRequests.map((request) => (
          <li key={request._id}>{request.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default LeaveRequests;
