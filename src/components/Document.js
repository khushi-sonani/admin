import React from 'react'
import './documet.css'
import Sidebar from './Sidebar'

function Document() {
  return (
    <div>
         <div className="sidebar">
        <Sidebar />
      </div>
      <div style={{  textAlign:'center', marginTop:'20px'}}>
            Documents
        </div>
    </div>
  )
}

export default Document
