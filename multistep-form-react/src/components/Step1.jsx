/* eslint-disable react/prop-types */
import '../App.css'
import { useState,useEffect } from 'react'
function Step1({selectedPlan, setSelectedPlan,validateStep}){
    
    const [username, setUsername] = useState(selectedPlan.username || '');
    const [useremail, setUseremail] = useState(selectedPlan.usermail || '');
    const [userphone, setUserphone] = useState(selectedPlan.userphone || '');

    const [errors, setErrors] = useState({
        username:'',
        useremail:'',
        userphone:''
    })

    const validateInputs = () => {
        let isValid = true
        const defaultErrorMessage = 'This field is required'
        const newErrors = { username: '', useremail: '', userphone: '' }


        if (username.trim() === '') {
            newErrors.username = defaultErrorMessage
            isValid = false
        } else if (!/^[a-zA-Z ]+$/.test(username)) {
            newErrors.username = 'Invalid username'
            isValid = false
        }

        if (useremail.trim() === '') {
            newErrors.useremail = defaultErrorMessage
            isValid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(useremail)) {
            newErrors.useremail = 'Invalid email'
            isValid = false
        }

        if (userphone.trim() === '') {
            newErrors.userphone = defaultErrorMessage
            isValid = false
        } else if (!/^(?:\+?\d{1,2}[- ]?)?\d{10}$/.test(userphone)) {
            newErrors.userphone = 'Invalid phone number'
            isValid = false
        }

        // set errors if any
        setErrors(newErrors)
        return isValid
    }

    // buttoncontainer can access this
    validateStep.current = validateInputs


    const updateField = (field, value) => { 
        setSelectedPlan(selectedPlan => ({ ...selectedPlan, [field]: value }));
    }

    useEffect(() => {
        setUsername(selectedPlan.username || '');
        setUseremail(selectedPlan.usermail || '');
        setUserphone(selectedPlan.userphone || '');
    }, [selectedPlan]);


    return(
        <div className="step active step1" data-step="0"> 
            <div className="userInputSection">
                <div className="header">
                    <h1>Personal info</h1>
                    <p>Please provide your name, email address, and phone number.</p>
                </div>

                <form className="step1form">
                    <div className="formContentWrapper">
                        
                        {/* username */}
                        <div className="userInput">
                            <div className="label">
                                <label htmlFor="username">Name</label>
                                <p className="error" >{errors.username}</p>
                            </div>
                            <input 
                                type="text" 
                                placeholder="e.g. Stephen King" 
                                id  ="username"
                                value={username}
                                onChange={ (e) => {
                                    setUsername(e.target.value) 
                                    updateField('username', e.target.value)
                                }}
                            />
                        </div>

                        {/* email */}
                        <div className="userInput">
                            <div className="label">
                                <label htmlFor="useremail">Email Address</label>
                                <p className="error" >{errors.useremail}</p>
                            </div>
                            <input 
                                type="email" 
                                placeholder="e.g. stephenking@lorem.com" 
                                id="useremail" 
                                value={useremail}
                                onChange={(e) => { 
                                    setUseremail(e.target.value) 
                                    updateField('usermail', e.target.value)
                                }} 
                            />
                        </div>

                        {/* phone */}
                        <div className="userInput">
                            <div className="label">
                                <label htmlFor="userphone">Phone Number</label>
                                <p className="error" >{errors.userphone}</p>
                            </div> 
                            <input 
                                type="tel" 
                                placeholder="e.g. +1 234 567 890" 
                                
                                value={userphone}
                                onChange={ (e) => { 
                                    setUserphone(e.target.value) 
                                    updateField('userphone', e.target.value)
                                }} 
                            />            
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Step1
