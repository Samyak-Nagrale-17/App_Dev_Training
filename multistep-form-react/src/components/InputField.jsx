/* eslint-disable react/prop-types */
// import React from 'react'
import '../App.css'

function InputField({ label, type, placeholder, value, onChange, error, restrictNumbersOnly }) {
  
  // handle key events only if restrictNumbersOnly is true
  const handleKeyDown = (e) => {
    if (!/[0-9+\-() ]/.test(e.key) && !['Backspace', 'Tab'].includes(e.key)) {
      e.preventDefault()
    }
  }

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
        onKeyDown={restrictNumbersOnly ? handleKeyDown : null}  
      />
    </div>
  )
}

export default InputField

