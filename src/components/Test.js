// // // // // // import React, { useState, useEffect } from 'react';

// // // // // // const DynamicTable = () => {
// // // // // //   const [currentMonth, setCurrentMonth] = useState('');
// // // // // //   const [tableData, setTableData] = useState([]);

// // // // // //   useEffect(() => {
// // // // // //     // Function to get the current month
// // // // // //     const getCurrentMonth = () => {
// // // // // //       const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// // // // // //       const currentDate = new Date();
// // // // // //       return months[currentDate.getMonth()];
// // // // // //     };

// // // // // //     setCurrentMonth(getCurrentMonth());

// // // // // //     // Function to get all dates of the current month
// // // // // //     const getAllDatesOfMonth = () => {
// // // // // //       const currentDate = new Date();
// // // // // //       const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
// // // // // //       const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

// // // // // //       const datesArray = [];
// // // // // //       for (let date = new Date(firstDay); date <= lastDay; date.setDate(date.getDate() + 1)) {
// // // // // //         datesArray.push(new Date(date));
// // // // // //       }

// // // // // //       return datesArray;
// // // // // //     };

// // // // // //     const datesOfMonth = getAllDatesOfMonth();

// // // // // //     // Generate table header with month name as th
// // // // // //     const tableHeader = (
// // // // // //       <tr style={{ backgroundColor: '#bdbdbd', color: 'black', textAlign: 'center' }}>
// // // // // //         <th style={{ width: '15%' }}>Date</th>
// // // // // //         <th colSpan="5">{currentMonth}</th>
// // // // // //       </tr>
// // // // // //     );

// // // // // //     // Generate table data
// // // // // //     const tableRows = datesOfMonth.map((date, index) => (
// // // // // //       <tr key={index} style={{ textAlign: 'center', color: 'black' }}>
// // // // // //         <td>{date.getDate()}</td>
// // // // // //         <td></td>
// // // // // //         <td></td>
// // // // // //         <td></td>
// // // // // //         <td></td>
// // // // // //         <td></td>
// // // // // //       </tr>
// // // // // //     ));

// // // // // //     setTableData([tableHeader, ...tableRows]);
// // // // // //   }, [currentMonth]); // Depend on currentMonth to re-render when it changes

// // // // // //   return (
// // // // // //     <div style={{ marginTop: '10px' }}>
// // // // // //       <table style={{ width: '100%' }}>
// // // // // //         {tableData}
// // // // // //       </table>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default DynamicTable;

// // // // // import React, { useState } from 'react';

// // // // // const LeaveApprovalComponent = ({ empid }) => {
// // // // //   const [approvalStatus, setApprovalStatus] = useState('');
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   const handleApproveRequest = async () => {
// // // // //     try {
// // // // //       setLoading(true);

// // // // //       // Assuming your API endpoint is hosted at http://localhost:3001
// // // // //       const response = await fetch(`https://attendance-backend-five.vercel.app/leave/leaverequest/${empid}`, {
// // // // //         method: 'PUT',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify({ status: 'approved' }), // Assuming you need to send the updated status
// // // // //       });

// // // // //       const data = await response.json();

// // // // //       // Handle success or error response from the server
// // // // //       if (response.ok) {
// // // // //         setApprovalStatus('Leave request approved successfully');
// // // // //       } else {
// // // // //         setApprovalStatus(`Error: ${data.message}`);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error approving leave request:', error);
// // // // //       setApprovalStatus('Error: Server error');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <button onClick={handleApproveRequest} disabled={loading}>
// // // // //         Approve Leave Request
// // // // //       </button>
// // // // //       {approvalStatus && <p>{approvalStatus}</p>}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default LeaveApprovalComponent;
// // // // import React, { useState, useEffect } from 'react';

// // // // const LateCountComponent = () => {
// // // //   const [lateCountData, setLateCountData] = useState({});
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         // Get the current date
// // // //         const currentDate = new Date();
        
// // // //         // Format the current date in YYYY-MM-DD format
// // // //         const formattedCurrentDate = currentDate.toISOString().split('T')[0];

// // // //         const apiUrl = `https://attendance-backend-five.vercel.app/latecount/latecoun/${formattedCurrentDate}`;
// // // //         const response = await fetch(apiUrl);

// // // //         if (response.ok) {
// // // //           const data = await response.json();
// // // //           setLateCountData(data);
// // // //           setLoading(false);
// // // //         } else {
// // // //           console.error('Error fetching late count data:', response.statusText);
// // // //           setLoading(false);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('Network error:', error);
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, []);

// // // //   return (
// // // //     <div>
// // // //       {loading ? (
// // // //         <p>Loading...</p>
// // // //       ) : (
// // // //         <div>
// // // //           <p>{lateCountData.message}</p>
// // // //           <p>Late Count: {lateCountData.lateCount}</p>
// // // //           {/* Render other details from lateCountData as needed */}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default LateCountComponent;

// // // import React, { useState, useEffect } from 'react';

// // // const LeaveRequestsComponent = () => {
// // //   const [leaveRequests, setLeaveRequests] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const response = await fetch('https://attendance-backend-five.vercel.app/leave/getleave');
// // //         if (response.ok) {
// // //           const data = await response.json();
// // //           setLeaveRequests(data.leaveRequests);
// // //           setLoading(false);
// // //         } else {
// // //           console.error('Error fetching leave requests:', response.statusText);
// // //           setError('Failed to fetch leave requests');
// // //           setLoading(false);
// // //         }
// // //       } catch (error) {
// // //         console.error('Network error:', error);
// // //         setError('Network error');
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   return (
// // //     <div>
// // //       {loading ? (
// // //         <p>Loading...</p>
// // //       ) : error ? (
// // //         <p>Error: {error}</p>
// // //       ) : (
// // //         <div>
// // //           <p>Leave requests retrieved successfully</p>
// // //           <ul>
// // //             {leaveRequests.map((request) => (
// // //               <li key={request._id}>
// // //                 {/* Display details of each leave request as needed */}
// // //                 Employee ID: {request.empid}, Status: {request.status}, ...
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default LeaveRequestsComponent;


// // import React, { useState, useEffect } from 'react';

// // const LeaveRequests = () => {
// //   const [leaveRequests, setLeaveRequests] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchLeaveRequests = async () => {
// //       try {
// //         const response = await fetch('https://attendance-backend-five.vercel.app/leave/getleave'); // Replace with the actual API endpoint
// //         const data = await response.json();

// //         if (response.ok) {
// //           setLeaveRequests(data.leaveRequests);
// //           console.log(data.leaveRequests)
// //         } else {
// //           setError(data.message || 'Failed to fetch leave requests');
// //         }
// //       } catch (error) {
// //         setError('Internal server error oucress');
// //         console.error('Error fetching leave requests:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchLeaveRequests();
// //   }, []); 

 
// //   return (
// //     <div>
// //       <h1>Leave Requests</h1>
// //       <table>
// //   <thead>
// //     <tr>
// //       <th>Employee ID</th>
// //       <th>From Date</th>
// //       <th>to Date</th>

// //       {/* Add more table headers as needed */}
// //     </tr>
// //   </thead>
// //   <tbody>
// //     {leaveRequests.map((request) => (
// //       <tr key={request._id}>
// //         <td>{request.empid}</td>
// //         <td>{request.fromdate}</td>
// //         <td>{request.to}</td>
// //         {/* Add more table cells as needed */}
// //       </tr>
// //     ))}
// //   </tbody>
// // </table>

// //     </div>
// //   );
// // };

// // export default LeaveRequests;


// import React, { useState } from 'react';
// import axios from 'axios';

// const YourComponent = () => {
//   const [empID, setEmpID] = useState('');
//   const [salary, setSalary] = useState('');

//   const postData = async () => {
//     try {
//       const response = await axios.post('https://attendance-backend-five.vercel.app/salary/salary', {
//         empID: empID,
//         amount: salary,
//         // otherData: 'some value', // You can add other data if needed
//       });

//       console.log(response.data); // Display the response data in the console
//       alert('done')
//       // Handle the response as needed
//     } catch (error) {
//       console.error('Error:', error.response ? error.response.data : error.message);
//       // Handle errors
//     }
//   };

//   return (
//     <div>
//       <label>
//         EmpID:
//         <input type="text" value={empID} onChange={(e) => setEmpID(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Salary:
//         <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} />
//       </label>
//       <br />
//       <button onClick={postData}>Submit</button>
//     </div>
//   );
// };

// export default YourComponent;




import React, { useState, useEffect } from 'react';

const YourComponent = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://attendance-backend-five.vercel.app/attendance/attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(/* your data here if needed */),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setResponseData(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div>
      {responseData ? (
        <div>
          <p>Data: {JSON.stringify(responseData)}</p>
          <p>Message: {responseData.message}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default YourComponent;

