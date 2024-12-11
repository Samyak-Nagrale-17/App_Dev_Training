/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './MeterModal.css';
import InputField from '../InputFieldForm/InputField';
import axios from 'axios';
import { toast } from 'react-toastify';
import BASE_URL from '../../config/apiConfig';


const MeterModal = ({ isOpen, onClose, onSubmit, initialData, isEditMode }) => {
  const initialFormState = {
    readingId: '',  
    userId: '',
    meterNumber: '',
    reading: '',
    date: '',
    paymentStatus: 'Pending'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && initialData) {
        setFormData({  
          readingId: initialData.reading_id,
          userId: initialData.user_meter_map_id.user_id,
          meterNumber: initialData.meter_number,
          reading: initialData.consumption,
          date: initialData.reading_date ? initialData.reading_date.split('T')[0] : '', 
          paymentStatus: initialFormState.paymentStatus
        });
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
  
    if (!formData.reading) {
      newErrors.reading = 'Required';
    } else if (isNaN(formData.reading) || Number(formData.reading) <= 0) {
      newErrors.reading = 'Invalid reading';
    }
  
    if (!formData.date) {
      newErrors.date = 'Required';
    }
  
    if (!formData.userId) {
      newErrors.userId = 'Required';
    } else if (isNaN(formData.userId) || Number(formData.userId) <= 0) {
      newErrors.userId = 'Invalid user id';
    }
  
    if (!formData.meterNumber) {
      newErrors.meterNumber = 'Required';
    } else if (!/^[A-Za-z0-9\s-]+$/.test(formData.meterNumber)) {
      newErrors.meterNumber = 'Invalid meter number';
    }
  
    return newErrors;
  };
  



  const addMeterData = async (newMeterData) => {
    const userToken = localStorage.getItem('token');
    const url = `${BASE_URL}/api/auth/admin-add-meter-reading/${newMeterData.userId}/${newMeterData.meterNumber}`;
  
    try {
      const response = await axios.post(
        url,
        {
          reading_date: newMeterData.date,
          consumption: Number(newMeterData.reading),
          is_bill_paid: newMeterData.paymentStatus === 'Paid',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
            'ngrok-skip-browser-warning': '6024',
          },
        }
      );
  
      toast.success('Meter data added successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
  
      if (onSubmit) onSubmit()
      setFormData(initialFormState); 
      onClose(); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add meter data!', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };
  



  const updateMeterData = async (updatedMeterData) => {
    console.log('updateMeterData start ...');
    const userToken = localStorage.getItem('token');

    const url = `${BASE_URL}/api/auth/admin-update-meter-reading/${updatedMeterData.readingId}`; 

    try {
      const response = await axios.put(
        url,
        {
          meterNumber: updatedMeterData.meterNumber,
          reading_date: updatedMeterData.date,
          consumption: updatedMeterData.reading,

          is_bill_paid: updateMeterData.is_bill_paid
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );

      console.log('Meter data updated successfully:', response.data);

      toast.success('Meter data updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      if (onSubmit) onSubmit();

      setFormData(initialFormState);
      onClose();
    } catch (error) {
      console.error('Error updating meter data:', error.message || error.response);

      toast.error(error.response?.data?.message || 'Failed to update meter data!', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log(formData);

      if (isEditMode) {
        updateMeterData(formData);  
      } else {
        addMeterData(formData);  
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
      <div className="metermodal-content">
        <h2>{isEditMode ? 'Edit Meter Data' : 'Add Meter Data'}</h2>

      {!isEditMode && (
        <>
          <InputField
            label="User ID"
            name="userId"
            type="number"
            placeholder="User ID"
            value={formData.userId}
            onChange={handleChange}
            error={errors.userId}
          />

          <InputField
            label="Meter Number"
            name="meterNumber"
            type="text"
            placeholder="e.g. MTR-101"
            value={formData.meterNumber}
            onChange={handleChange}
            error={errors.meterNumber}
          />
        </>
      )}


      {/* payment status */}
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

      <InputField
        label="Reading Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        error={errors.date}
      />

      <InputField
        label="Reading"
        name="reading"
        type="number"
        placeholder="e.g. 140"
        value={formData.reading}
        onChange={handleChange}
        error={errors.reading}
      />

        <div className="metermodal-button-wrapper">
          <button onClick={handleSubmit}>
            {isEditMode ? 'Save Changes' : 'Add Meter Data'}
          </button>
          <button onClick={handleClose} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default MeterModal;

























// res1


// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const BASE_URL = 'https://your-api-url.com'; // Replace with your API base URL

// const MeterModal = ({ isOpen, onClose, initialData, isEditMode, onSubmit }) => {
//   const initialFormState = {
//     userId: '',
//     meterNumber: '',
//     date: '',
//     reading: '',
//     paymentStatus: 'Pending',
//   };

//   const [formData, setFormData] = useState(initialData || initialFormState);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const addMeterData = async () => {
//     const userToken = localStorage.getItem('token');
//     const url = `${BASE_URL}/api/auth/admin-add-meter-reading/${formData.userId}/${formData.meterNumber}`;

//     try {
//       const response = await axios.post(
//         url,
//         {
//           reading_date: formData.date,
//           consumption: Number(formData.reading),
//           is_bill_paid: formData.paymentStatus === 'Paid',
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${userToken}`,
//             'ngrok-skip-browser-warning': '6024',
//           },
//         }
//       );

//       toast.success('Meter data added successfully!', {
//         position: 'top-right',
//         autoClose: 3000,
//       });

//       if (onSubmit) onSubmit(); // Notify parent to refresh data
//       setFormData(initialFormState); // Reset form state
//       onClose(); // Close the modal
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to add meter data!', {
//         position: 'top-right',
//         autoClose: 5000,
//       });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addMeterData();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h2>{isEditMode ? 'Edit Meter Data' : 'Add Meter Data'}</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             User ID:
//             <input
//               type="text"
//               name="userId"
//               value={formData.userId}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             Meter Number:
//             <input
//               type="text"
//               name="meterNumber"
//               value={formData.meterNumber}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             Reading Date:
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             Reading:
//             <input
//               type="number"
//               name="reading"
//               value={formData.reading}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             Payment Status:
//             <select
//               name="paymentStatus"
//               value={formData.paymentStatus}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="Pending">Pending</option>
//               <option value="Paid">Paid</option>
//             </select>
//           </label>
//           <div className="modal-actions">
//             <button type="submit">Save</button>
//             <button type="button" onClick={onClose}>
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MeterModal;
