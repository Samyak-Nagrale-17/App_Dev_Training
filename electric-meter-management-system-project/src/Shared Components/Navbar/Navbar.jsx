import './Navbar.css'
import main_logo from '../../assets/images/Screenshot_2024-12-02_124754-removebg-preview.png'
import { useNavigate } from 'react-router'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogoutButtonClick = (e) => {
    e.preventDefault()
    // clear token stored 
    localStorage.clear()  
    navigate('/login')
  }

  return (
    <div className="navbar-container">
        <div className="logo-container">
          <img src={main_logo} alt="" />
          <p>Power Moniter</p>
        </div>
      
        <button className="login-button" onClick={handleLogoutButtonClick}>Log out</button>
    </div>
 )
}

export default Navbar