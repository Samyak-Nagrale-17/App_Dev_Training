/* eslint-disable react/prop-types */
import { useState } from 'react';
import './AddMeterModal.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import BASE_URL from '../../config/apiConfig';
import InputField from '../InputFieldForm/InputField';

const AddMeterModal = ({ isOpen, onClose, user }) => {
  const [meterNumber, setMeterNumber] = useState('');
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setMeterNumber(e.target.value);
  };

  const handleSubmit = async () => {
    const newErrors = {}
    if (meterNumber === '') {
      // toast.error('Enter meter number.', {
      //   position: "top-right",
      //   autoClose: 3000,
      // });
      
      newErrors.meter_number = 'Required'
    } 
    else if(!/^[A-Za-z0-9\s-]+$/.test(meterNumber)){
      newErrors.meter_number = 'Invalid meter number'
    }

    //set the errors
    setErrors(newErrors)

    const userToken = localStorage.getItem('token')

    // const addMeterData = {
    //     meterNumber: meterNumber,
    //     reading_date: '',
    //     consumption: ''
    // }

    try {
      const url = `${BASE_URL}/api/auth/admin-create-meter-reading/${user.user_id}`;
      const response = await axios.post(url, 
        {
            meter_number:meterNumber,
            reading_date:'',
            consumption:''
        }
        ,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
            'ngrok-skip-browser-warning': '6024',
          },
      });

      toast.success('Meter reading added successfully!', {
        position: "top-right",
        autoClose: 3000,
      }); 

      onClose();
    } catch (error) {
      console.error('Error occured: ', error.response.data.message || 'Failed to add ')
      toast.error('Failed to add meter reading.', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="add-meter-modal-content">
        <h2>Assign meter number</h2>

        <InputField
          label='Meter Number'
          type='text'
          value={meterNumber}
          placeholder='e.g. MTR-101'
          onChange={handleChange}
          error={errors.meter_number}
        />

        <div className="add-meter-modal-button-wrapper">
          <button onClick={handleSubmit}>Add Meter</button>
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddMeterModal;
