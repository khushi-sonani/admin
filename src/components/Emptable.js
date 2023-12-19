import React from "react";
import './emp.css'
import Sidebar from './Sidebar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function App() {
  return (
    <div >
      <div className="sidebar">
        <Sidebar />
      </div>
   
      <div style={{ marginLeft:'230px', marginTop:'10px', display:'flex'}}>
        <ArrowBackIcon  style={{ color:'black'}}/>
        <p style={{ marginLeft:'600px', color:'black'}}> Edit Employee</p>
      </div>
    </div>
  );
}

export default App;
