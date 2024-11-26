/* eslint-disable react/prop-types */

function AddOnBox({ addOn, selectedPlan, setSelectedPlan }) {
  const handleAddOnToggle = () => {
    const updatedAddOns = [...selectedPlan.addOns]
    const existingIndex = updatedAddOns.findIndex((item) => item.name === addOn.name)

    if (existingIndex !== -1) {
      // remove add-on if present
      updatedAddOns.splice(existingIndex, 1)
    } else {
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
