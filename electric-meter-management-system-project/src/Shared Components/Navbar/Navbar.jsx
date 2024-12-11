import './Navbar.css';
import { useState } from 'react';
import main_logo from '../../assets/images/Screenshot_2024-12-02_124754-removebg-preview.png';
import { useNavigate } from 'react-router';
import BASE_URL from '../../config/apiConfig';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserProfile from '../UserModal/UserProfile'; 


const Navbar = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false); 

  const handleLogoutButtonClick = (e) => {
    e.preventDefault();

    setTimeout(() => {
      toast.success('Logout successful!', {
        position: 'top-right',
        autoClose: 3000,
      });

      localStorage.clear();
      navigate('/login');
    }, 1000);
  };

  const handleProfileClick = async (e) => {
    e.preventDefault();
    openModal();
    await fetchLoggedInUserProfile();
  };

  const fetchLoggedInUserProfile = async () => {
    const userToken = localStorage.getItem('token');
    const url = `${BASE_URL}/api/auth/user-profile`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
          'ngrok-skip-browser-warning': '6024',
        },
      });

      setProfileData(response.data.profile[0]); 
    } catch (error) {
      console.error('Error:', error.message || error.response);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="navbarContainer">
      <div className="logoContainer">
        <img src={main_logo} alt="" />
        <p>Power Monitor</p>
      </div>

      <div className="button-wrapper">
        <button className="userprofile-button" onClick={handleProfileClick}>
          <i className="fa-regular fa-user"></i>
        </button>

        <button className="loginButton" onClick={handleLogoutButtonClick}>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>

      {isModalOpen && profileData && (
        <UserProfile profileData={profileData} onClose={closeModal} />
      )}
    </div>
  );
};

export default Navbar;
