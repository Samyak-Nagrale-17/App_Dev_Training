import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/LoginPage/Login';
import Register from './Pages/RegistrationPage/Register';
import UserDashboardHome from './Pages/UserDashboard/UserDashboardHome';
import UserDashboardRecords from './Pages/UserDashboard/UserDashboardRecords';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import AdminDashboard2 from './Pages/AdminDashboard/AdminDashboard2';
import AdminDashboardFileUpload from './Pages/AdminDashboard/AdminDashboardFileUpload';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <div className="body">
      <div className="appContainer">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userdashoard/home" element={<UserDashboardHome />} />
            <Route path="/userdashoard/records" element={<UserDashboardRecords />} />
            <Route path="/admindashboard/userdata" element={<AdminDashboard />} />
            <Route path="/admindashboard/meterdata" element={<AdminDashboard2 />} />
            <Route path="/admindashboard/fileupload" element={<AdminDashboardFileUpload />} />
          </Routes>
        </Router>

        <ToastContainer />
      </div>
    </div>
  );
}

export default App;










