import React from 'react';
import ReactDOM from 'react-dom/client';
/* import './index.css'; */
import reportWebVitals from './reportWebVitals';
import App from './App';
import Dashboard from './Dashboard';
import Side from './components/Sidebar'
import Customer from './components/customer'
import Login from './components/Login'
import  Report from './components/Report'
import UserPage from './components/UserPage'
import Register from './components/Register'
import Emptable from './components/Emptable'
import Holiday from './components/Holiday'
import Leave from './components/Leave'
import Bankadd from './components/Bankadd'
import Company from './components/Company'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
