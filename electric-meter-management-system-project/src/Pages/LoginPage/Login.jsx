import './Login.css'
import { useState } from 'react'
import InputField from '../../Shared Components/InputFieldForm/InputField'
import { Link, useNavigate } from 'react-router-dom'
import main_logo from '../../assets/images/Screenshot_2024-12-02_124754-removebg-preview.png'
import login_image from '../../assets/images/bg-login-1-filter.jpg'
import axios from 'axios'

function Login() {
  const navigate = useNavigate()

  const [useremail, setUseremail] = useState('') 
  const [password, setPassword] = useState('')
  
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [apiError, setApiError] = useState('')

  const validateForm = () => {
    let isValid = true

    setEmailError('')
    setPasswordError('')

    if (useremail.trim() === '') {
      setEmailError('Required')
      isValid = false
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(useremail)) {
      setEmailError('Invalid email')
      isValid = false
    }

    if (password.trim() === '') {
      setPasswordError('Required')
      isValid = false
    }

    return isValid
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   const userData = {
  //     email: useremail,
  //     password: password
  //   }
  //   const url = 'https://a612-103-22-140-65.ngrok-free.app/api/auth/login'
  //   const response = await fetch( url , {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userData)
  //     } 
  //   )

  //   const data = await response.json()
  //   // console.log( "data : ",data)

  //   localStorage.setItem("token" , data.token)
  //   // console.log( "token from localStorage" , localStorage.getItem("token"))
    
  //   if(validateForm()){
  //     if(data.role_id === 1){
  //       navigate('/admindashboard/userdata')
  //     } 
  //     else if(data.role_id === 2){
  //       navigate('/userdashoard/home')
  //     }
  //   }

  //   // if(data.role_id === 1){
  //   //   navigate('/admindashboard/userdata')
  //   // } 
  //   // else if(data.role_id === 2){
  //   //   navigate('/userdashoard/home')
  //   // }

  //   // // store the token in localstorage
  //   // localStorage.setItem("token", data.token)

  //   // // call the validate
  //   // if(validateForm()){
  //   //   if(data.role_id === 1){
  //   //     navigate('/admindashboard/userdata')
  //   //   } 
  //   //   else if(data.role_id === 2){
  //   //     navigate('/userdashoard/home')
  //   //   }
  //   // }

  //   // if (validateForm()) {  
  //   //   if (useremail === 'admin@admin.com' && password === 'admin') {
  //   //     navigate('/admindashboard/userdata')
  //   //   } else {
  //   //     navigate('/userdashoard/home')
  //   //   }
  //   // }
  // }


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;  
  }

  const userData = {
    email: useremail,
    password: password,
  };

  try {
    const url = 'https://a612-103-22-140-65.ngrok-free.app/api/auth/login';
    const response = await axios.post(url, userData);

    const data = response.data;
    localStorage.setItem("token", data.token);

    if (data.role_id === 1) {
      navigate('/admindashboard/userdata');
    } else if (data.role_id === 2) {
      navigate('/userdashoard/home');
    } 
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    setApiError(error.response?.data?.message || error.message || 'An error occurred');

  }
}

  return (
    <div className="login-wrapper">
      <div className='login-image'>
        <img src={login_image} alt="" />
      </div>

      <div className="login-container">
        <div className="logo-container">
          <img src={main_logo} alt="main_logo" />
          <p>Power Monitor</p>
        </div>

        <h1>Sign in to your account</h1>
        <form className='login-form' onSubmit={handleSubmit}>
          <InputField 
            label="Email ID"
            error={emailError}
            type='email'
            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
          />

          <InputField 
            label="Password"
            error={passwordError}
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className='api-error'>
            {apiError && <p>{apiError}</p>}
          </div>

          <button type='submit' className='login-submit-button'>Log In</button>
        </form>

        <div>
          <p>Not a user? <Link to='/register' className='register-link'>Register now</Link></p>
        </div>

      </div>
    </div>
  )
}

export default Login
