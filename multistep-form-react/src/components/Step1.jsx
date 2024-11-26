/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import InputField from './InputField' 
import '../App.css'

function Step1({ selectedPlan, setSelectedPlan, validateStep, currentStep, setCurrentStep }) {
  // init state with values from selectedPlan
  const [username, setUsername] = useState(selectedPlan.username || '')
  const [useremail, setUseremail] = useState(selectedPlan.usermail || '')
  const [userphone, setUserphone] = useState(selectedPlan.userphone || '')

  const [errors, setErrors] = useState({ username: '', useremail: '', userphone: '' })

  const validateInputs = () => {
    let isValid = true
    const newErrors = { username: '', useremail: '', userphone: '' }
    const defaultErrorMessage = 'This field is required'
    
    // username validation
    if (!username.trim()) {
      newErrors.username = defaultErrorMessage
      isValid = false
    } else if (!/^[a-zA-Z ]+$/.test(username)) {
      newErrors.username = 'Invalid username'
      isValid = false
    }

    // email validation
    if (!useremail.trim()) {
      newErrors.useremail = defaultErrorMessage
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(useremail)) {
      newErrors.useremail = 'Invalid email'
      isValid = false
    }

    // phone validation
    if (!userphone.trim()) {
      newErrors.userphone = defaultErrorMessage
      isValid = false
    } else if (!/^(?:\+?\d{1,3}[- ]?)?\d{10}$/.test(userphone)) {
      newErrors.userphone = 'Invalid phone number'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  validateStep.current = validateInputs

  useEffect(() => {
    setUsername(selectedPlan.username || '')
    setUseremail(selectedPlan.usermail || '')
    setUserphone(selectedPlan.userphone || '')
  }, [selectedPlan])

  return (
    <div className="step active step1" data-step="0">
      <div className="userInputSection">
        <div className="header">
          <h1>Personal Info</h1>
          <p>Please provide your name, email address, and phone number.</p>
        </div>

        <form className="step1form">
        <div className="formContentWrapper">
            <InputField 
              label="Name"
              type={"text"}
              placeholder="e.g. Stephen King"
              value={username}
              onChange={(e) => { 
                console.log(e.target) 
                setUsername(e.target.value) 
                setSelectedPlan(prev => ({ ...prev, username: e.target.value })) }}
              error={errors.username}
            />

            <InputField
              label="Email Address"
              type={"email"}
              placeholder="e.g. stephenking@lorem.com"
              value={useremail}
              onChange={(e) => {
                console.log(e.target) 
                setUseremail(e.target.value) 
                setSelectedPlan(prev => ({ ...prev, usermail: e.target.value })) }}
              error={errors.useremail}
            />

            <InputField
              label="Phone Number"
              type={"text"}
              placeholder="e.g. +1 234 567 890"
              value={userphone}
              onChange={(e) => { 
                setUserphone(e.target.value) 
                setSelectedPlan(prev => ({ ...prev, userphone: e.target.value })) }}
              error={errors.userphone}
              restrictNumbersOnly={true} 
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Step1
