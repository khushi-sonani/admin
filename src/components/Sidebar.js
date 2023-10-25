import React, { useState, useEffect,  useRef } from 'react';
import './side.css';
import logo from './img/logo.jpg'
import { format, parseISO } from 'date-fns';

function Dashboard() {
   

    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

    const toggleSubMenu = () => {
        setIsSubMenuVisible(!isSubMenuVisible);
    };
    return (
        <div style={{ height:'100px'}}>
            <body id="page-top">

                {/*  <!-- Page Wrapper --> */}
                <div id="wrapper">

                    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                        {/* Sidebar - Brand */}
                        <a className="sidebar-brand d-flex flex-column align-items-center justify-content-center" href="/company">
                            <img src={logo} alt="logo" className="logo" style={{ marginTop: '100px', height: "70px", width: '70px' }} />
                            <div className="sidebar-brand-text mx-3" style={{ marginTop: '20px' }}>
                                Abcd <sup></sup>
                            </div>
                            <div className="company-code" style={{ fontSize: '11px' }}>company code: xyz</div>
                        </a>

                        {/*  <!-- Divider --> */}
                    

                        {/*  <!-- Nav Item - Dashboard --> */}
                        <li className={`nav-item ${selectedOption === 'myTeam' ? 'selected' : ''}`} style={{ marginTop: '100px' }}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('myTeam')}
                            >
                                <i className="fas fa-fw fa-users" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>MY Team</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'employees' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('employees')}
                            >
                                <i className="fas fa-fw fa-user" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Employees</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'attendance' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('attendance')}
                            >
                                <i className="fas fa-fw fa-fingerprint" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Attendance</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'report' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('report')}
                            >
                                <i className="fas fa-fw fa-file" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Report</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'notification' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('notification')}
                            >
                                <i className="fas fa-fw fa-bell" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Notification</span>
                            </a>
                        </li>
                        <li className={`nav-item`} >
                            <a
                                className={`nav-link clickable ${selectedOption === 'calculateSalary' ? 'selected' : ''}`}
                                onClick={toggleSubMenu}
                            >
                                <i className="fas fa-fw fa-rupee-sign" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Calculate Salary</span>
                            </a>
                            {isSubMenuVisible && (
                                <ul className="sub-menu">
                                    <li className={`nav-item ${selectedOption === 'pending' ? 'selected' : ''}`}>
                                        <a
                                            className="nav-link"
                                            href="calculate-salary/pending"
                                            onClick={() => setSelectedOption('pending')}
                                        >
                                            <i className="fas fa-fw fa-clock" style={{ fontSize: '15px', marginRight: '8px' }}></i>
                                            <span style={{ fontSize: '15px' }}>Pending</span>
                                        </a>
                                    </li>
                                    <li className={`nav-item ${selectedOption === 'finalize' ? 'selected' : ''}`}>
                                        <a
                                            className="nav-link"
                                            href="calculate-salary/finalize"
                                            onClick={() => setSelectedOption('finalize')}
                                        >
                                            <i className="fas fa-fw fa-check-circle" style={{ fontSize: '15px', marginRight: '8px' }}></i>
                                            <span style={{ fontSize: '15px' }}>Finalize</span>
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className={`nav-item ${selectedOption === 'addPayment' ? 'selected' : ''}`} >
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('addPayment')}
                            >
                                <i className="fas fa-fw fa-credit-card" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Add Payment</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'payEmployees' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('payEmployees')}
                            >
                                <i className="fas fa-fw fa-coins" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Pay Employees</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'liveLocation' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('liveLocation')}
                            >
                                <i className="fas fa-fw fa-map-marker-alt" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Live Location</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'documents' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('documents')}
                            >
                                <i className="fas fa-fw fa-file-alt" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Documents</span>
                            </a>
                        </li>
                        <li className={`nav-item ${selectedOption === 'settings' ? 'selected' : ''}`}>
                            <a
                                className="nav-link"
                                href="dashboard"
                                onClick={() => setSelectedOption('settings')}
                            >
                                <i className="fas fa-fw fa-cog" style={{ fontSize: '17px', marginRight: '8px' }}></i>
                                <span style={{ fontSize: '17px' }}>Settings</span>
                            </a>
                        </li>
                    </ul>
        

                  
                                </div>
            </body>
        </div>
    )
}

export default Dashboard;
