import './App.css'
import { BrowserRouter as Router ,Route, Routes,Navigate } from "react-router-dom"
import Login from './Pages/LoginPage/Login'
import Register from './Pages/RegistrationPage/Register'
// import UserDashboard from './Pages/UserDashboard/UserDashboardHome'
import UserDashboardHome from './Pages/UserDashboard/UserDashboardHome'
import UserDashboardRecords from './Pages/UserDashboard/UserDashboardRecords'
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard'
import AdminDashboard2 from './Pages/AdminDashboard/AdminDashboard2'
import AdminDashboardFileUpload from './Pages/AdminDashboard/AdminDashboardFileUpload'
// import Navbar from './Shared Components/Navbar/Navbar'



function App() {
  return (
    <div className='body'>
      <div className='appContainer'>
        {/* <Navbar/> */}
        <Router>
          <Routes> 

            {/* Redirect root to /login */}
            <Route path="/" element={<Navigate to="/login" replace />} />


            <Route path="/login" element = {<Login/>}></Route>
            <Route path="/register" element = {<Register/>} ></Route>
            <Route path="/userdashoard/home" element={<UserDashboardHome/>}></Route>
            <Route path="/userdashoard/records" element={<UserDashboardRecords/>}></Route>
            {/* <Route path="/admindashboard/" element={<AdminDashboard/>}></Route>  */}
            <Route path='/admindashboard/userdata' element={<AdminDashboard/>}></Route>
            <Route path='/admindashboard/meterdata' element={<AdminDashboard2/>}></Route>
            <Route path='/admindashboard/fileupload' element={<AdminDashboardFileUpload/>}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App