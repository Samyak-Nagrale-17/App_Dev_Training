import './UserDashboard.css'
import SidebarUser from '../../Shared Components/Sidebar/SidebarUser'
import Navbar from '../../Shared Components/Navbar/Navbar'
import UserRecordDashboard from '../../Shared Components/UserRecordDashboard/UserRecordDashboard'

const UserDashboardRecords = () => {
  return(
    <div className='userdashboard-container'>
      <Navbar/>
      <div className="content">
        <SidebarUser/>
        <UserRecordDashboard/>
      </div>
    </div>
  )
}

export default UserDashboardRecords