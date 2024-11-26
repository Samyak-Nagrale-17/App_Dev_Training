/* eslint-disable react/prop-types */
import '../App.css'
function InputField({ label, type, placeholder, value, onChange, error, restrictNumbersOnly }) {
  
  //accpet only numbers
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
        onKeyDown={restrictNumbersOnly && handleKeyDown }  
      />
    </div>
  )
}

export default InputField

