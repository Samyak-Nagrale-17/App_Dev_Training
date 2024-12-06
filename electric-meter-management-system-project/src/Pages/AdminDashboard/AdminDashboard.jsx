// import React from 'react'
import '../AdminDashboard/AdminDashboard.css'
import Sidebar from '../../Shared Components/Sidebar/Sidebar'
import UserDataDashboard from '../../Shared Components/UserDataDashboard/UserDataDashboard'
import Navbar from '../../Shared Components/Navbar/Navbar'

// import { Routes, Route, Navigate } from 'react-router-dom'
// import UserDataDashboard from '../../Shared Components/UserDataDashboard/UserDataDashboard'
// import MeterDataDashboard from '../../Shared Components/MeterDataDashboard/MeterDataDashboard'


const AdminDashboard = () => {
  return (
    <div className = 'admin-dashboard-container'>
      <Navbar/> 
      <div className='content'>
        <Sidebar/>
        <UserDataDashboard/>  
      </div>
      {/* <Routes>
        <Route path='/' element={<Navigate to='user-date'/>}></Route>
        <Route path='user-data' element={<UserDataDashboard/>}></Route>
        <Route path='meter-data' element={<MeterDataDashboard/>}></Route>
      </Routes> */}
    </div>    
  )
}

export default AdminDashboard