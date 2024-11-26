/* eslint-disable react/prop-types */
// import React from 'react'

function AddOnBox({ addOn, selectedPlan, setSelectedPlan }) {
  const handleAddOnToggle = () => {
    const updatedAddOns = [...selectedPlan.addOns]
    const existingIndex = updatedAddOns.findIndex((item) => item.name === addOn.name)

    if (existingIndex !== -1) {
      // Remove add-on if already selected
      updatedAddOns.splice(existingIndex, 1)
    } else {
      // Add new add-on if not already selected
      updatedAddOns.push(addOn)
    }
    
    setSelectedPlan({ ...selectedPlan, addOns: updatedAddOns })
  }

  return (
    <div
      className={`box ${
        selectedPlan.addOns.findIndex((item) => item.name === addOn.name) !== -1 ? 'ad-selected' : ''
      }`}
      onClick={handleAddOnToggle}
    >
      <input
        type="checkbox"
        id={addOn.name.replace(/\s+/g, '').toLowerCase()}
        checked={selectedPlan.addOns.findIndex((item) => item.name === addOn.name) !== -1}
        readOnly 
      />
      <div className="custom-check"></div>
      <div className="description">
        <label>{addOn.name}</label>
        <small>{addOn.description}</small>
      </div>
      <p className="priceAddon">
        +$
        {selectedPlan.duration === 'yearly' ? addOn.priceYearly : addOn.priceMonthly}
        /{selectedPlan.duration === 'yearly' ? 'yr' : 'mo'}
      </p>
    </div>
  )
}

export default AddOnBox
