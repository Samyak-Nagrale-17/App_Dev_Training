/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */

// import  { useState, useEffect } from 'react'
// import './MeterModal.css'

// const MeterModal = ({ isOpen, onClose, onSubmit, initialData, isEditMode }) => {
//   const [userId, setUserId] = useState('')
//   const [meterNumber, setMeterNumber] = useState('')
//   const [reading, setReading] = useState('')
//   const [date, setDate] = useState('')

//   useEffect(() => {
//     if (isEditMode && initialData) {
//       setUserId(initialData.userId)
//       setMeterNumber(initialData.meterNumber)
//       setReading(initialData.reading)
//       setDate(initialData.date)
//     } else {
//       setUserId('')
//       setMeterNumber('')
//       setReading('')
//       setDate('')
//     }
//   }, [initialData, isEditMode])

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onSubmit({ userId, meterNumber, reading, date })
//     onClose()
//   }

//   if (!isOpen) return null

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>{isEditMode ? 'Edit Meter Data' : 'Add Meter Data'}</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="number"
//             placeholder="User ID"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Meter Number"
//             value={meterNumber}
//             onChange={(e) => setMeterNumber(e.target.value)}
//             required
//           />
//           <input
//             type="number"
//             placeholder="Reading"
//             value={reading}
//             onChange={(e) => setReading(e.target.value)}
//             required
//           />
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//           />
//           <button type="submit">{isEditMode ? 'Save Changes' : 'Add Meter Data'}</button>
//           <button type="button" onClick={onClose} className="close-button">Cancel</button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default MeterModal




import { useState, useEffect } from 'react';
import './MeterModal.css';
import InputField from '../InputFieldForm/InputField';

const MeterModal = ({ isOpen, onClose, onSubmit, initialData, isEditMode }) => {
  const initialFormState = {
    userId: '',
    meterNumber: '',
    reading: '',
    date: '',
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
    if (!formData.userId) newErrors.userId = 'Required';
    if (!formData.meterNumber) newErrors.meterNumber = 'Required';
    if (!formData.reading) newErrors.reading = 'Required';
    if (!formData.date) newErrors.date = 'Required';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
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
      <div className="metermodal-content">
        <h2>{isEditMode ? 'Edit Meter Data' : 'Add Meter Data'}</h2>

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
          placeholder="Meter Number"
          value={formData.meterNumber}
          onChange={handleChange}
          error={errors.meterNumber}
        />
        <InputField
          label="Reading"
          name="reading"
          type="number"
          placeholder="Reading"
          value={formData.reading}
          onChange={handleChange}
          error={errors.reading}
        />
        <InputField
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
        />

        <div className='metermodal-button-wrapper'>
          <button onClick={handleSubmit}>{isEditMode ? 'Save Changes' : 'Add Meter Data'}</button>
          <button onClick={handleClose} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default MeterModal;

