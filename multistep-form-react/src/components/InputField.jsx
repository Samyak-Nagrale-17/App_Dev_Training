// // InputField.jsx
// import React from 'react';
// import '../App.css'; // Ensure your CSS styles are applied

// function InputField({ label, type, placeholder, value, onChange, error }) {
//   return (
//     <div className="userInput">
//       <div className="label">
//         {/* <label htmlFor={label.toLowerCase()}>{label}</label> */}
//         <label >{label}</label>
//         <p className="error">{error}</p>
//       </div>
//       <input
//         type={type}
//         // id={label.toLowerCase()}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//       />
//     </div>
//   );
// }

// export default InputField;








// NEWEST SHIT WILL GO HERE:
import React from 'react';
import '../App.css';

function InputField({ label, type, placeholder, value, onChange, error, restrictNumbersOnly }) {
  
  // Handle key events only if restrictNumbersOnly is true
  const handleKeyDown = (e) => {
    if (restrictNumbersOnly && !/[0-9+\-() ]/.test(e.key) && 
        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="userInput">
      <div className="label">
        <label>{label}</label>
        <p className="error">{error}</p>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={restrictNumbersOnly ? handleKeyDown : null}  // Conditionally apply handler
      />
    </div>
  );
}

export default InputField;

