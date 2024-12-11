import './Sidebar.css';
import { useNavigate, useLocation } from 'react-router';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // selected button route
  const routeToIndexMap = {
    '/admindashboard/userdata': 0,
    '/admindashboard/meterdata': 1,
    '/admindashboard/fileupload': 2,
  };

  const activeButton = routeToIndexMap[location.pathname] || 0;

  const handleButtonClick = (route) => {
    navigate(route);
  };

  return (
    <div className="container">
      <button
        className={`sidebar-button ${activeButton === 0 ? 'button-active' : ''}`}
        onClick={() => handleButtonClick('/admindashboard/userdata')}
      >
        <i className="fa-solid fa-server"></i>
        User Data
      </button>

      <button
        className={`sidebar-button ${activeButton === 1 ? 'button-active' : ''}`}
        onClick={() => handleButtonClick('/admindashboard/meterdata')}
      >
        <i className="fa-solid fa-gauge-simple"></i>
        Meter Data
      </button>

      <button
        className={`sidebar-button ${activeButton === 2 ? 'button-active' : ''}`}
        onClick={() => handleButtonClick('/admindashboard/fileupload')}
      >
        <i className="fa-solid fa-file-arrow-up"></i>
        File Upload
      </button>
    </div>
  );
};

export default Sidebar;

