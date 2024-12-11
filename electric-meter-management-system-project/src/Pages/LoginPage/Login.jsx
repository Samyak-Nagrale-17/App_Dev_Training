/* eslint-disable no-unused-vars */
import './Login.css'
import { useState } from 'react'
import InputField from '../../Shared Components/InputFieldForm/InputField'
import { Link, useNavigate } from 'react-router-dom'
import main_logo from '../../assets/images/Screenshot_2024-12-02_124754-removebg-preview.png'
import login_image from '../../assets/images/bg-login-1-filter.jpg'
import axios from 'axios'
import { toast } from 'react-toastify'  
import BASE_URL from '../../config/apiConfig'
import bcrypt from "bcryptjs-react";


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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }


    const hashsedPassword = await bcrypt.hash(password,10)
    // console.log(hashsedPassword)
    const userData = {
      email: useremail,
      password: password,
      // password:hashsedPassword,
    }

    try {
      const url = `${BASE_URL}/api/auth/login`;

      const response = await axios.post(url, userData,{

      })

      const data = response.data
      localStorage.setItem('token', data.token)
      localStorage.setItem('current_login_user_id', data.user_id)

      toast.success('Login successful!', {
        position: "top-right", 
        autoClose: 2000, 
      })

      setTimeout(() => {
        if (data.role_id === 1) {
          navigate('/admindashboard/userdata')
        } else if (data.role_id === 2) {
          navigate('/userdashoard/home')
        }
      }, 2000)
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message)
      setApiError(error.response?.data?.message || error.message || 'An error occurred')

      toast.error(apiError || 'Login failed', {
        position: "top-right",
        autoClose: 5000,  
      })
    }
  }

  return (
    <div className="loginWrapper">
      <div className='loginImage'>
        <img src={login_image} alt="" />
      </div>

      <div className="loginContainer">
        <div className="logoContainer">
          <img src={main_logo} alt="main_logo" />
          <p>Power Monitor</p>
        </div>

        <h1>Sign in to your account</h1>
        <form className='loginForm' onSubmit={handleSubmit}>
          <InputField 
            label="Email ID"
            error={emailError}
            type='email'
            placeholder='e.g. john.doe@gmail.com'
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

          <button type='submit' className='loginSubmitButton'>Log In</button>
        </form>

        <div>
          <p className='link-text'>Not a user? <Link to='/register' className='registerLink'>Register now</Link></p>
        </div>

      </div>
    </div>
  )
}

export default Login
