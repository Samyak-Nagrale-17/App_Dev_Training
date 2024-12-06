// import React from 'react'
import '../AdminDashboard/AdminDashboard.css'
import Sidebar from '../../Shared Components/Sidebar/Sidebar'
import MeterDataDashboard from '../../Shared Components/MeterDataDashboard/MeterDataDashboard'
import Navbar from '../../Shared Components/Navbar/Navbar'

const AdminDashboard = () => {
  return (
    <div className = 'admin-dashboard-container'>
      <Navbar/>
      <div className='content'>
        <Sidebar/>
        <MeterDataDashboard/>
      </div>
    </div>    
  )
}

export default AdminDashboard