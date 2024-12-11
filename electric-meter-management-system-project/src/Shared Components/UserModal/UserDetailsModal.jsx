/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './UserDetailsModal.css';
import InputField from '../InputFieldForm/InputField';
import BASE_URL from '../../config/apiConfig';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserDetailsModal = ({ isOpen, onClose, onSave, initialData, selectedMeter }) => {
  const initialFormState = {
    date: '',
    consumption: '',
    billAmount: '',
    paymentStatus: 'Pending',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData(initialFormState);
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  

  const validateForm = () => {
    const newErrors = {}; 
    if (!formData.date) newErrors.date = 'Required';

    if (!formData.consumption) newErrors.consumption = 'Required';
    
    if (!formData.billAmount){
      newErrors.billAmount = 'Required';
    } else if(formData.billAmount <= 0){
      newErrors.billAmount = 'Invalid amount'
    }

    if (!formData.paymentStatus) newErrors.paymentStatus = 'Required';
    
    return newErrors;
  };

  const handleAddRecord = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const newMeterData = {
        date: formData.date,
        reading: formData.consumption,
        billAmount: formData.billAmount,
        isBillPaid: formData.paymentStatus === 'Paid', 
        meterNumber: selectedMeter,
      };

      try {
        const userToken = localStorage.getItem('token');
        const currentUserId = localStorage.getItem('current_login_user_id');
        const url = `${BASE_URL}/api/auth/admin-add-meter-reading/${currentUserId}/${selectedMeter}`;

        const response = await axios.post(
          url,
          {
            reading_date: newMeterData.date,
            consumption: newMeterData.reading,
            bill_amount: newMeterData.billAmount,
            is_bill_paid: newMeterData.isBillPaid,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
              // 'ngrok-skip-browser-warning': '69420',
              'ngrok-skip-browser-warning': '6024', 
            },
          }
        );


        toast.success('Record added successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });

        if (onSave) onSave(response.data); 
        setFormData(initialFormState); 
        onClose(); 
      } catch (error) {
        console.error('Error adding record:', error.message || error.response);
        toast.error(error.response?.data?.message || 'Failed to add record!', {
          position: 'top-right',
          autoClose: 5000,
        });
      }
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
      <div className="userdetailsmodal-content">
        <h2>Add Record</h2>

        <div className="selected-meter">
          <strong>Selected Meter:</strong> {selectedMeter || 'No meter selected'}
        </div>

        <InputField
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
        />

        <InputField
          label="Consumption"
          name="consumption"
          type="number"
          value={formData.consumption}
          onChange={handleChange}
          error={errors.consumption}
        />

        <InputField
          label="Bill Amount"
          name="billAmount"
          type="text"
          value={formData.billAmount}
          onChange={handleChange}
          error={errors.billAmount}
        />

        <div className="input-field">
          <label>Payment Status</label>
          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
          {errors.paymentStatus && (
            <span className="error-text">{errors.paymentStatus}</span>
          )}
        </div>

        <div className="userdetailsmodal-button-wrapper">
          <button onClick={handleAddRecord}>Add Record</button>
          <button onClick={handleClose} className="close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
