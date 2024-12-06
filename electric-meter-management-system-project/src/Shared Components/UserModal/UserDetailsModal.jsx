/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './UserModal.css';
import InputField from '../InputFieldForm/InputField'; 

const UserDetailsModal = ({ isOpen, onClose, onSave, initialData }) => {
  const initialFormState = {
    date: '',
    consumption: '',
    billAmount: '',
    paymentStatus: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.consumption) newErrors.consumption = 'Consumption is required';
    if (!formData.billAmount) newErrors.billAmount = 'Bill amount is required';
    if (!formData.paymentStatus) newErrors.paymentStatus = 'Payment status is required';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const finalData = {
        ...formData,
        amount: formData.billAmount, 
      };
      onSave(finalData);
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
      <div className="modal-content">
        <h2>{initialData ? 'Edit Record' : 'Add Record'}</h2>

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
        <InputField
          label="Payment Status"
          name="paymentStatus"
          type="text"
          value={formData.paymentStatus}
          onChange={handleChange}
          error={errors.paymentStatus}
        />

        <button onClick={handleSubmit} disabled={Object.keys(errors).length > 0}>Add Record</button>
        <button onClick={handleClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default UserDetailsModal;
