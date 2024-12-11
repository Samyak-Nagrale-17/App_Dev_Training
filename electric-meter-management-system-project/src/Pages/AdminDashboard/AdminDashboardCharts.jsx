import './AdminDashboard.css'
import Navbar from '../../Shared Components/Navbar/Navbar'
import Sidebar from '../../Shared Components/Sidebar/Sidebar'
// import FileUpload from '../../Shared Components/FileUpload/FileUpload'

const AdminDashboardFileUpload = () => {
  return (
    <div className = 'admin-dashboard-container'>
      <Navbar/>
      <div className='content'>
        <Sidebar/>
        {/* <FileUpload/> */}
      </div>
    </div>
  )
}

export default AdminDashboardFileUpload
