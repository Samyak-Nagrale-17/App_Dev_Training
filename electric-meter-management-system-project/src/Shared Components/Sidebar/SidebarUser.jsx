import './Sidebar.css';
import { useNavigate, useLocation } from 'react-router';

const SidebarUser = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="container">
            <button
                className={`sidebar-button ${isActive('/userdashoard/records') ? 'button-active' : ''}`}
                onClick={() => navigate('/userdashoard/records')}
            >
                <i className="fa-solid fa-house"></i>
                User Records
            </button>

            <button
                className={`sidebar-button ${isActive('/userdashoard/home') ? 'button-active' : ''}`}
                onClick={() => navigate('/userdashoard/home')}
            >
                <i className="fa-solid fa-gauge-simple"></i>
                Consumption
            </button>

            {/* <p>Welcome, User</p> */}
        </div>
    );
};

export default SidebarUser;
