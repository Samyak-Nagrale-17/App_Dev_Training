import { useState, useEffect } from 'react';
import './UserModal.css';
import InputField from '../InputFieldForm/InputField';
import axios from 'axios';
import { toast } from 'react-toastify';
import BASE_URL from '../../config/apiConfig';

const UserModal = ({ isOpen, onClose, onSubmit, initialData, isEditMode }) => {
  const initialFormState = {
    username: '',
    email: '',
    password: '',
    address: '',
    pincode: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && initialData) {
        setFormData(initialData);
      } else {
        setFormData(initialFormState);
      }
      setErrors({});
    }
  }, [isOpen, initialData, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const validateForm = () => {
    const newErrors = {};
  
    const usernameRegex = /^[A-Za-z ]+$/;
    if (!formData.username) {
      newErrors.username = 'Required';
    } else if (!usernameRegex.test(formData.username)) {
      newErrors.username = 'Invalid name';
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
  
    if (!isEditMode && !formData.password) {
      newErrors.password = 'Required';
    }
  
    if (!formData.address) {
      newErrors.address = 'Required';
    }
  
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!formData.pincode) {
      newErrors.pincode = 'Required';
    } else if (!pincodeRegex.test(formData.pincode)) {
      newErrors.pincode = 'Invalid pincode';
    }
  
    return newErrors;
  };

  const registerNewUser = async (newUserData) => {
    console.log('registerNewUser start ...');
    // const userToken = localStorage.getItem('token');

    try {
      const url = `${BASE_URL}/api/auth/create-user`;

      const response = await axios.post(url, newUserData, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${userToken}`,
          'ngrok-skip-browser-warning': '6024',
        },
      });

      console.log('User created successfully:', response.data);

      toast.success('User registered successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      if (onSubmit) onSubmit();
    } catch (error) {
      console.error('Register new user failed:', error.message || error.response);

      toast.error(error.response?.data?.message || 'Failed to register user!', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  const updateUser = async (updatedUserData) => {
    console.log('updateUser start ...');
    const userToken = localStorage.getItem('token');

    try {
      // const url = `${BASE_URL}/api/auth/update-user/${updatedUserData.user_id}`; 
      const url = `${BASE_URL}/api/auth/admin-updateUsers/${updatedUserData.user_id}`;


      const response = await axios.put(url, updatedUserData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
          'ngrok-skip-browser-warning': '6024',
        },
      });

      console.log('User updated successfully:', response.data);

      toast.success('User updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      if (onSubmit) onSubmit();
    } catch (error) {
      console.error('Update user failed:', error.message || error.response);

      toast.error(error.response?.data?.message || 'Failed to update user!', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log(formData);

      if (isEditMode) {
        await updateUser(formData);
      } else {
        await registerNewUser(formData);
      }

      setFormData(initialFormState);
      setErrors({});
      onClose();
    } else {
      setErrors(newErrors);
    }
  };

  const handleClose = () => {
    setFormData(initialFormState);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="usermodal-content">
        <h2>{isEditMode ? 'Edit User' : 'Add User'}</h2>

        <InputField
          label="Username"
          name="username"
          type="text"
          placeholder="e.g. John Doe"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="e.g. john.doe.gmail.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        {!isEditMode && (
          <InputField
            label="Password"
            name="password"
            type="text"
            // placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
        )}

        <InputField
          label="Address"
          name="address"
          type="text"
          // placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
        />

        <InputField
          label="Pincode"
          name="pincode"
          type="text"
          // placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          error={errors.pincode}
        />

        <div className="usermodal-button-wrapper">
          <button onClick={handleSubmit}>{isEditMode ? 'Save Changes' : 'Add User'}</button>
          <button onClick={handleClose} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;






