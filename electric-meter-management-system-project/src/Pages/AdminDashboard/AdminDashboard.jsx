import '../AdminDashboard/AdminDashboard.css'
import Sidebar from '../../Shared Components/Sidebar/Sidebar'
import UserDataDashboard from '../../Shared Components/UserDataDashboard/UserDataDashboard'
import Navbar from '../../Shared Components/Navbar/Navbar'

const AdminDashboard = () => {
  return (
    <div className = 'admin-dashboard-container'>
      <Navbar/> 
      <div className='content'>
        <Sidebar/>
        <UserDataDashboard/>  
      </div>
    </div>    
  )
}

export default AdminDashboard