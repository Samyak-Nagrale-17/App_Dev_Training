import './UserDashboard.css'
import SidebarUser from '../../Shared Components/Sidebar/SidebarUser'
import Navbar from '../../Shared Components/Navbar/Navbar'
import UserConsumptionDashboard from '../../Shared Components/UserConsumptionDashboard/UserConsumptionDashboard'

const UserDashboardHome = () => {
  return (
    <div className='userdashboard-container'>
      <Navbar/>
      <div className="content">
        <SidebarUser/>
        <UserConsumptionDashboard/>
      </div>
    </div>
  )
}

export default UserDashboardHome
