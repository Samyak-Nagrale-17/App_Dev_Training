// import '../App.css'
// import { useState } from 'react'
// function Step1({selectedPlan, setSelectedPlan}){
//     // for storing the userDetails in the context


//     return(
//         <div className="step active step1" data-step="0"> 
//             <div className="userInputSection">
//                 <div className="header">
//                     <h1>Personal info</h1>
//                     <p>Please provide your name, email address, and phone number.</p>
//                 </div>
            
//                 <form className="step1form">
//                     <div className="formContentWrapper">
//                         <div className="userInput">
//                             <div className="label">
//                                 <label htmlFor="username">Name</label>
//                                 <p className="error" id="usernameErr">This field is required</p>
//                             </div>
//                             <input type="text" placeholder="e.g. Stephen King" id ="username" />
//                         </div>

//                         <div className="userInput">
//                             <div className="label">
//                                 <label htmlFor="useremail">Email Address</label>
//                                 <p className="error" id="useremailErr">This field is required</p>
//                             </div>
//                             <input type="email" placeholder="e.g. stephenking@lorem.com" id="useremail" />
//                         </div>

//                         <div className="userInput">
//                             <div className="label">
//                                 <label htmlFor="userphone">Phone Number</label>
//                                 <p className="error" id="userphoneErr">This field is required</p>
//                             </div> 
//                             <input type="tel" placeholder="e.g. +1 234 567 890" id="userphone" />            
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Step1









// // NEW SHIT WILL GO HERE
// import { useState, useEffect } from 'react';
// import '../App.css';

// function Step1({ selectedPlan, setSelectedPlan, validateStep }) {
//   // Initialize state with values from selectedPlan
//   const [username, setUsername] = useState(selectedPlan.username || '');
//   const [useremail, setUseremail] = useState(selectedPlan.usermail || '');
//   const [userphone, setUserphone] = useState(selectedPlan.userphone || '');
  
//   const [errors, setErrors] = useState({ username: '', useremail: '', userphone: '' });

//   // Validation logic
//   const validateInputs = () => {
//     let isValid = true;
//     const newErrors = { username: '', useremail: '', userphone: '' };

//     // Username validation
//     if (username.trim() === '') {
//       newErrors.username = 'This field is required';
//       isValid = false;
//     } else if (!/^[a-zA-Z ]+$/.test(username)) {
//       newErrors.username = 'Invalid username';
//       isValid = false;
//     }

//     // Email validation
//     if (useremail.trim() === '') {
//       newErrors.useremail = 'This field is required';
//       isValid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(useremail)) {
//       newErrors.useremail = 'Invalid email';
//       isValid = false;
//     }

//     // Phone validation
//     if (userphone.trim() === '') {
//       newErrors.userphone = 'This field is required';
//       isValid = false;
//     } else if (!/^(?:\+?\d{1,3}[- ]?)?\d{10}$/.test(userphone)) {
//       newErrors.userphone = 'Invalid phone number';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   // Expose validation function to parent
//   validateStep.current = validateInputs;

//   // Update selectedPlan if inputs change
//   const updateField = (field, value) => {
//     setSelectedPlan(prevState => ({ ...prevState, [field]: value }));
//   };

//   // Synchronize state with selectedPlan when navigating back
//   useEffect(() => {
//     setUsername(selectedPlan.username || '');
//     setUseremail(selectedPlan.usermail || '');
//     setUserphone(selectedPlan.userphone || '');
//   }, [selectedPlan]);

//   return (
//     <div className="step active step1" data-step="0"> 
//       <div className="userInputSection">
//         <div className="header">
//           <h1>Personal Info</h1>
//           <p>Please provide your name, email address, and phone number.</p>
//         </div>

//         <form className="step1form">
//           {/* Name Input */}
//           <div className="userInput">
//             <div className="label">
//               <label htmlFor="username">Name</label>
//               <p className="error">{errors.username}</p>
//             </div>
//             <input 
//               type="text" 
//               placeholder="e.g. Stephen King" 
//               value={username}
//               onChange={(e) => { 
//                 setUsername(e.target.value); 
//                 updateField('username', e.target.value); 
//               }}
//             />
//           </div>

//           {/* Email Input */}
//           <div className="userInput">
//             <div className="label">
//               <label htmlFor="useremail">Email Address</label>
//               <p className="error">{errors.useremail}</p>
//             </div>
//             <input 
//               type="email" 
//               placeholder="e.g. stephenking@lorem.com" 
//               value={useremail}
//               onChange={(e) => { 
//                 setUseremail(e.target.value); 
//                 updateField('usermail', e.target.value); 
//               }}
//             />
//           </div>

//           {/* Phone Input */}
//           <div className="userInput">
//             <div className="label">
//               <label htmlFor="userphone">Phone Number</label>
//               <p className="error">{errors.userphone}</p>
//             </div> 
//             <input 
//               type="tel" 
//               placeholder="e.g. +1 234 567 890" 
//               value={userphone}
//               onChange={(e) => { 
//                 setUserphone(e.target.value); 
//                 updateField('userphone', e.target.value); 
//               }}
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Step1;




// NEWEST SHIT GOES HERE

// Step1.jsx
import { useState, useEffect } from 'react';
import InputField from './InputField'; // Import the reusable component
import '../App.css';

function Step1({ selectedPlan, setSelectedPlan, validateStep }) {
  // Initialize state with values from selectedPlan
  const [username, setUsername] = useState(selectedPlan.username || '');
  const [useremail, setUseremail] = useState(selectedPlan.usermail || '');
  const [userphone, setUserphone] = useState(selectedPlan.userphone || '');

  const [errors, setErrors] = useState({ username: '', useremail: '', userphone: '' });

  // Validation logic
  const validateInputs = () => {
    let isValid = true;
    const newErrors = { username: '', useremail: '', userphone: '' };
    const defaultErrorMessage = 'This field is required';
    // Username validation
    if (!username.trim()) {
      newErrors.username = defaultErrorMessage;
      isValid = false;
    } else if (!/^[a-zA-Z ]+$/.test(username)) {
      newErrors.username = 'Invalid username';
      isValid = false;
    }

    // Email validation
    if (!useremail.trim()) {
      newErrors.useremail = defaultErrorMessage
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(useremail)) {
      newErrors.useremail = 'Invalid email';
      isValid = false;
    }

    // Phone validation
    if (!userphone.trim()) {
      newErrors.userphone = defaultErrorMessage
      isValid = false;
    } else if (!/^(?:\+?\d{1,3}[- ]?)?\d{10}$/.test(userphone)) {
      newErrors.userphone = 'Invalid phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Expose validation function to parent
  validateStep.current = validateInputs;

  // Synchronize state with selectedPlan when navigating back
  useEffect(() => {
    setUsername(selectedPlan.username || '');
    setUseremail(selectedPlan.usermail || '');
    setUserphone(selectedPlan.userphone || '');
  }, [selectedPlan]);

  return (
    <div className="step active step1" data-step="0">
      <div className="userInputSection">
        <div className="header">
          <h1>Personal Info</h1>
          <p>Please provide your name, email address, and phone number.</p>
        </div>

        <form className="step1form">
          <InputField
            label="Name"
            type={"text"}
            placeholder="e.g. Stephen King"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setSelectedPlan(prev => ({ ...prev, username: e.target.value })); }}
            error={errors.username}
          />

          <InputField
            label="Email Address"
            type={"email"}
            placeholder="e.g. stephenking@lorem.com"
            value={useremail}
            onChange={(e) => { setUseremail(e.target.value); setSelectedPlan(prev => ({ ...prev, usermail: e.target.value })); }}
            error={errors.useremail}
          />

          <InputField
            label="Phone Number"
            type={"text"}
            placeholder="e.g. +1 234 567 890"
            value={userphone}
            onChange={(e) => { setUserphone(e.target.value); setSelectedPlan(prev => ({ ...prev, userphone: e.target.value })); }}
            error={errors.userphone}
            restrictNumbersOnly={true} 
          />
        </form>
      </div>
    </div>
  );
}

export default Step1;
