import React from 'react'
import Sidebar from './Sidebar'

function Company() {
    const handleBackClick = () => {
        // Implement the logic for the back button here
    };
  return (
    <div>
        <Sidebar/>
        <div style={{ backgroundColor:'pink'}}>
        <div className="header" style={{ marginLeft: '300px', paddingTop: '0', paddingBottom: '0' }}>
        <div onClick={handleBackClick} style={{ display: 'flex', alignItems: 'center' }}>
       
          <h5 className="header-title" style={{ margin: '0' }}>Company Details</h5>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Company
