/* import logo from './logo.svg'; */
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Dashboard from './Dashboard';
import Bank from './components/Bank'
import Sidebar from './components/Sidebar'
import Customer from './components/customer'
import Login from './components/Login'
import Report from './components/Report'
import UserPage from './components/UserPage'
import Emp from './components/Emp'
import Register from './components/Register'
import Emptable from './components/Emptable'
import Holiday from './components/Holiday'
import Leave from './components/Leave'
import Bankadd from './components/Bankadd'
import Company from './components/Company'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/bank" element={<Bank />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/" element={<Login />} />
      <Route path="/report" element={<Report />} />
      <Route path="/userPage" element={<UserPage />} />
      <Route path="/emp" element={<Emp />} />
      <Route path="/register" element={<Register />} />
      <Route path="/emptable" element={<Emptable />} />
      <Route path="/holiday" element={<Holiday />} />
      <Route path="/leave" element={<Leave />} />
      <Route path="/bankadd" element={<Bankadd />} />
      <Route path="/company" element={<Company />} />
     
      
  </Routes>
</BrowserRouter>

  );
}

export default App;
