import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import axios from 'axios';
import './reporttt.css';
import Cookies from 'js-cookie';

function DynamicTable() {
  const [tableData, setTableData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [attendanceData, setAttendanceData] = useState({});
  const [leaveStats, setLeaveStats] = useState({});
  const [mobileNo, setMobileNo] = useState('');

 
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

  const handleDownloadPDF = () => {
    const content = document.getElementById('pdf-content');
    const headerContent = document.createElement('div');
    headerContent.innerHTML = `
      <style>
        .pdf-header {
          font-size: 18px;
        }
      </style>
      <h4 class="pdf-header" style="color: black; text-align: center; margin-top: 20px;">abcd</h4>
      <h4 class="pdf-header" style="color: black; text-align: center;">ATTENDANCE REPORT FOR THE MONTH OF ${currentMonth}</h4>
      <hr style="margin: 10px ;" />
    `;

    const combinedContent = document.createElement('div');
    combinedContent.appendChild(headerContent);
    combinedContent.appendChild(content.cloneNode(true));

    combinedContent.querySelectorAll('*').forEach((element) => {
      element.style.fontSize = '12px';
    });

    const pdfOptions = {
      margin: 10,
      filename: 'attendance_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', putOnlyUsedFonts: true },
    };

    html2pdf(combinedContent, pdfOptions);
  };

  const [leaveCounts, setLeaveCounts] = useState({});
  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1

    const fetchLeaveCounts = async () => {
      const counts = {};
      for (const user of users) {
        try {
          const response = await fetch(
            `https://attendance-backend-five.vercel.app/leave/leave-count/${user.empid}/${currentMonth}`
          );
          if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
          }

          const data = await response.json();
          counts[user.empid] = data.leaveCount;
        } catch (error) {
          setError(error.message);
          console.error('Error fetching leave count:', error);
        }
      }
      setLeaveCounts(counts);
    };

    fetchLeaveCounts();
  }, [users]);

  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1

        const response = await fetch(`https://attendance-backend-five.vercel.app/holiday/holidays/${year}/${month}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        
      }
    };

    fetchData();
  }, []); 


  return (
    <div style={{ marginTop: '100px' }}>
      <div id="pdf-header-content" style={{}}>
        <h4 style={{ color: 'black', textAlign: 'center', marginTop: '20px' }}>abcd</h4>
        <br />
        <h4 style={{ color: 'black', textAlign: 'center' }}>ATTENDANCE REPORT FOR THE MONTH OF {currentMonth}</h4>
        <hr style={{ margin: '10px 0' }} />
      </div>
      <div id="pdf-content" style={{}}>
        <h5 style={{ color: 'black', marginTop: '20px' }}>Employee Details </h5>
        <div style={{}}>
          <table style={{ width: '100%' }}>
            <tr style={{ backgroundColor: '#bdbdbd', color: 'black', textAlign: 'center' }}>
              <th style={{ width: '15%' }}>Name</th>
              <th style={{ width: '15%' }}>Phone Number</th>
              <th style={{ width: '15%' }}>emp id</th>
              <th style={{ width: '15%' }}>designation</th>
              <th style={{ width: '15%' }}>Schedule</th>
              <th style={{ width: '25%' }}>Schedule Working Hours</th>
            </tr>
            {users.map((user, index) => (
              <tr  style={{ textAlign: 'center', color: 'black' }}>
                <td>{user.name}</td>
                <td>{user.mobileNo}</td>
                <td>{user.empid}</td>
                <td></td>
                <td>09:00 AM-06:30 PM</td>
                <td></td>
              </tr>
            ))}
          </table>
        </div>

        <div>
          <h5 style={{ color: 'black', marginTop: '20px' }}>Attendance Summary</h5>
        </div>

        <div style={{ marginTop: '10px' }}>
          <table style={{ width: '100%' }}>
            <tr style={{ backgroundColor: '#bdbdbd', color: 'black', textAlign: 'center' }}>
            <th style={{ width: '10%' }}>Emp Id</th>
              <th style={{ width: '10%' }}>Payable Days</th>
              <th style={{ width: '8%' }}>Present</th>
              <th style={{ width: '10%' }}>Absent</th>
              <th style={{ width: '10%' }}>Half Day</th>
              <th style={{ width: '10%' }}>Double Present</th>
              <th style={{ width: '10%' }}>Week Off</th>
              <th style={{ width: '10%' }}>Paid Leave</th>
              <th style={{ width: '10%' }}>Unpaid Leave</th>
              <th style={{ width: '10%' }}>Public Holiday</th>
            </tr>
            {users.map((user, index) => (
  <tr style={{ textAlign: 'center', color: 'black' }}>
    <td>{user.empid}</td>
    <td>26.0</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>{leaveCounts[user.empid]}</td>
    <td></td>
    <td></td>
    {data && (
      <td>{data.totalHolidays}</td>
    )}
  </tr>
))}
</table>
        </div>

        <div>
          <table style={{ width: '100%' }}>{/* ... (additional tables or data) */}</table>
        </div>
      </div>

      {/* Download button */}
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
}

export default DynamicTable;
