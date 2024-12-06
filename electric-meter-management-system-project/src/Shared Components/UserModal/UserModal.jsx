/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { useState, useEffect } from 'react'
// import './UserModal.css'
// import InputField from '../InputFieldForm/InputField'
// import axios from 'axios'

// const UserModal = ({ isOpen, onClose, onSubmit, initialData, isEditMode }) => {
//   const initialFormState = {
//     username: '',
//     useremail: '',
//     password: '',  
//     city: '',
//     pincode: ''
//   }

//   const [formData, setFormData] = useState(initialFormState)
//   const [errors, setErrors] = useState({})

//   useEffect(() => {
//     if (isOpen) {
//       if (isEditMode && initialData) {
//         setFormData(initialData)
//       } else {
//         setFormData(initialFormState)
//       }
//       setErrors({}) 
//     }
//   }, [isOpen, initialData, isEditMode])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const validateForm = () => {
//     const newErrors = {}
//     if (!formData.username) newErrors.username = 'Username is required'
//     if (!formData.useremail) newErrors.useremail = 'Email is required'
//     if (!formData.password) newErrors.password = 'Password is required'
//     if (!formData.city) newErrors.city = 'City is required'
//     if (!formData.pincode) newErrors.pincode = 'Pincode is required'
//     return newErrors
//   }

//   const handleSubmit = async () => {
//     const newErrors = validateForm()
//     if (Object.keys(newErrors).length === 0) {
//       await registerNewUser(formData)
//       setFormData(initialFormState)  
//       setErrors({})  
//       onClose() 
//     } else {
//       setErrors(newErrors)
//     }
//   }

//   const handleClose = () => {
//     setFormData(initialFormState) 
//     setErrors({}) 
//     onClose()
//   }

//   const registerNewUser = async (newUserData) => {
//     try {
//       const url = 'https://a612-103-22-140-65.ngrok-free.app/api/auth/create-user'
//       const response = await axios.post(url, newUserData)
//       console.log('User created successfully:', response.data)
//     } catch (error) {
//       console.error('Register new user failed:', error.message)
//     }
//   }

//   if (!isOpen) return null

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>{isEditMode ? 'Edit User' : 'Add User'}</h2>

//         <InputField
//           label="Username"
//           name="username"
//           type="text"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           error={errors.username}
//         /> 
//         <InputField
//           label="Email"
//           name="useremail"
//           type="email"
//           placeholder="Email"
//           value={formData.useremail}
//           onChange={handleChange}
//           error={errors.useremail}
//         />
//         <InputField
//           label="Password"
//           name="password"
//           type="text"  
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           error={errors.password}
//         />
//         <InputField
//           label="Address"
//           name="city"
//           type="text"
//           placeholder="Address"
//           value={formData.city}
//           onChange={handleChange}
//           error={errors.city}
//         />

//         <InputField
//           label="Pincode"
//           name="pincode"
//           type="text"
//           placeholder="Pincode"
//           value={formData.pincode}
//           onChange={handleChange}
//           error={errors.pincode}
//         />

//         <button onClick={handleSubmit}>{isEditMode ? 'Save Changes' : 'Add User'}</button>
//         <button onClick={handleClose} className="close-button">Close</button>
//       </div>
//     </div>
//   )
// }

// export default UserModal



import { useState, useEffect } from 'react'
import './UserModal.css'
import InputField from '../InputFieldForm/InputField'
import axios from 'axios'
const UserModal = ({ isOpen, onClose, onSubmit, initialData, isEditMode }) => {
 const initialFormState = {
   username: '',
   email: '',
   password: '',
   address: '',
   pincode: ''
 }
 const [formData, setFormData] = useState(initialFormState)
 const [errors, setErrors] = useState({})
 useEffect(() => {
   if (isOpen) {
     if (isEditMode && initialData) {
       setFormData(initialData)
     } else {
       setFormData(initialFormState)
     }
     setErrors({})
   }
 }, [isOpen, initialData, isEditMode])

 const handleChange = (e) => {
   const { name, value } = e.target
   setFormData({ ...formData, [name]: value })
 }

 const validateForm = () => {
   const newErrors = {}
   if (!formData.username) newErrors.username = 'Required'
   if (!formData.email) newErrors.email = 'Required'
   if (!formData.password) newErrors.password = 'Required'
   if (!formData.address) newErrors.address = 'Required'
   if (!formData.pincode) newErrors.pincode = 'Required'
   return newErrors
 }

 const handleSubmit = async () => {
   const newErrors = validateForm()
   if (Object.keys(newErrors).length === 0) {
     console.log(formData)
     await registerNewUser(formData)
     setFormData(initialFormState)
     setErrors({})
     onClose()
   } else {
     setErrors(newErrors)
   }
 }

 const handleClose = () => {
   setFormData(initialFormState)
   setErrors({})
   onClose()
 }

 const registerNewUser = async (newUserData) => {
   try {
     const url = 'https://a612-103-22-140-65.ngrok-free.app/api/auth/create-user'
     const response = await axios.post(url, newUserData)
     console.log('User created successfully:', response.data)
   } catch (error) {
     console.error('Register new user failed:', error.message)
   }
 }

 if (!isOpen) return null
 
 return (
  <div className="modal-overlay">
    <div className="usermodal-content">
      <h2>{isEditMode ? 'Edit User' : 'Add User'}</h2>
      
      <InputField
        label="Username"
        name="username"
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
      />

      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <InputField
        label="Password"
        name="password"
        type="text" 
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />

      <InputField
        label="Address"
        name="address"
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        error={errors.address}
      />

      <InputField
        label="Pincode"
        name="pincode"
        type="text"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
        error={errors.pincode}
      />

      <div className='usermodal-button-wrapper'>
        <button onClick={handleSubmit}>{isEditMode ? 'Save Changes' : 'Add User'}</button>
        <button onClick={handleClose} className="close-button">Close</button>
      </div>
      
    </div>
  </div>
 )
}
export default UserModal











