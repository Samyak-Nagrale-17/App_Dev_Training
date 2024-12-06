import './Sidebar.css'
import { useNavigate } from 'react-router'

const SidebarUser = () => {

    const navigate = useNavigate()
    
    const handleRecordsButtonClick = () => {
        navigate('/userdashoard/records')
    }

    const handleConsumptionButtonClick = () => {
        navigate('/userdashoard/home')
        // navigate('/userdashoard/consumption')
    }


  return (
    <div className="container">
            <button className = {'sidebar-button '} onClick={handleRecordsButtonClick} >
            {/* <button className = {'sidebar-button ' + (isMarked) ?'button-active' : ''} onClick={handleUserDataButtonClick} > */}
            <i className="fa-solid fa-house"></i>
                User records
            </button>
            
            <button className= {'sidebar-button '} onClick={handleConsumptionButtonClick} >
            <i className="fa-solid fa-gauge-simple"></i>    
                Consumption
            </button>

            <p>Welcome, User</p>
        </div> 
  )
}

export default SidebarUser