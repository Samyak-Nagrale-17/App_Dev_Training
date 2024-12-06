/* eslint-disable react/prop-types */
// import React from 'react'

// import './InputField.css'

// const InputField = ({label ,error,type, placeholder, value,onChange}) => {
//   return(
//     <div className="userInput">
//         <div className="label">
//             <label>{label}</label>
//             <p className="error">{error}</p>
//         </div>

//         <input 
//             type={type}
//             placeholder={placeholder} 
//             value={value}
//             onChange={onChange}
//         />
//     </div>
//   )
// }

// export default InputField











import './InputField.css'

const InputField = ({ label, name,error, type, placeholder, value, onChange }) => {
  return (
    <div className="userInput">
      <div className="label">
        <label>{label}</label>
        {error && <p className="error">{error}</p>} 
      </div>

      <input 
        type={type}
        name={name}
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default InputField
