import './Register.css';
import { useState } from 'react';
import InputField from '../../Shared Components/InputFieldForm/InputField';
import { useNavigate, Link } from 'react-router-dom';
import main_logo from '../../assets/images/Screenshot_2024-12-02_124754-removebg-preview.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import BASE_URL from '../../config/apiConfig';

function Register() {
  const navigate = useNavigate();

  const [useremail, setUseremail] = useState('');
  const [username, setUsername] = useState('');
  // const [userphone, setUserphone] = useState('');
  const [useraddress, setUseraddress] = useState('');
  const [userpincode, setUserpincode] = useState('');
  const [userpassword, setUserpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    username: '',
    useremail: '',
    // userphone: '',
    useraddress: '',
    userpincode: '',
    userpassword: '',
    confirmPassword: ''
  });

  const validate = () => {
    let validationErrors = {};

    if (!username) {
      validationErrors.username = 'Required';
    } else if (!/^[A-Za-z\s]+$/.test(username)) {
      validationErrors.username = 'Invalid name';
    }

    if (!useremail) {
      validationErrors.useremail = 'Required';
    // } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(useremail)) {
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(useremail)) {
      validationErrors.useremail = 'Invalid email';
    }

    // if (!userphone) {
    //   validationErrors.userphone = 'Required';
    // } else if (!/^(?:\+91|91)?[789]\d{9}$/.test(userphone)) {
    //   validationErrors.userphone = 'Invalid phone number';
    // }

    if (!useraddress) {
      validationErrors.useraddress = 'Required';
    }

    if (!userpincode) {
      validationErrors.userpincode = 'Required';
    } else if (!/^[1-9]{1}[0-9]{5}$/.test(userpincode)) {
      validationErrors.userpincode = 'Invalid pincode';
    }

    if (!userpassword) {
      validationErrors.userpassword = 'Required';
    } else if (userpassword !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = 'Required';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const newUserData = {
      username,
      email: useremail,
      // phone: userphone,
      address: useraddress,
      pincode: userpincode,
      password: userpassword
    };

    try {
      const url = `${BASE_URL}/api/auth/create-user`;
      const response = await axios.post(url, newUserData);

      toast.success('Registration successful!', {
        position: 'top-right',
        autoClose: 2000
      });

      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);

      toast.error(error.response?.data?.message || 'Registration failed', {
        position: 'top-right',
        autoClose: 5000
      });
    }
  };

  return (
    <div className="registerWrapper">
      <div className="title-wrapper">
        <div className="logoContainer">
          <img src={main_logo} alt="main_logo" />
          <p>Power Monitor</p>
        </div>

        <h1>Create a new account</h1>

        <div className="login-link-wrapper">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="registerContainer">
        <form className="registrationForm" onSubmit={handleSubmit}>
          <div className="group">
            <div className="subgroup">
              <InputField
                label="Name"
                error={errors.username}
                type="text"
                value={username}
                placeholder='e.g. John Doe'
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputField
                label="Email id"
                error={errors.useremail}
                type="email"
                placeholder='e.g. john.doe@gmail.com'
                value={useremail}
                onChange={(e) => setUseremail(e.target.value)}
              />
            </div>

            {/* <InputField
              label="Phone number"
              error={errors.userphone}
              type="text"
              value={userphone}
              onChange={(e) => setUserphone(e.target.value)}
            /> */}
          </div>

          <div className="group">
            <div className="subgroup">
              <InputField
                label="Address"
                error={errors.useraddress}
                type="text"
                value={useraddress}
                onChange={(e) => setUseraddress(e.target.value)}
              />
              <InputField
                label="Pincode"
                error={errors.userpincode}
                type="number"
                value={userpincode}
                onChange={(e) => setUserpincode(e.target.value)}
              />
            </div>
          </div>

          <div className="group">
            <div className="subgroup">
              <InputField
                label="Password"
                error={errors.userpassword}
                type="password"
                value={userpassword}
                onChange={(e) => setUserpassword(e.target.value)}
              />
              <InputField
                label="Confirm password"
                error={errors.confirmPassword}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="registerButton" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
