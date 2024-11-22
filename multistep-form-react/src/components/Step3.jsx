/* eslint-disable react/prop-types */
import '../App.css';

function Step3({ selectedPlan, setSelectedPlan }) {

  const addOnsList = [
    { id: 1, name: 'Online service', description: 'Access to multiplayer games', priceMonthly: 1, priceYearly: 10 },
    { id: 2, name: 'Larger storage', description: 'Extra 1TB of cloud save', priceMonthly: 2, priceYearly: 20 },
    { id: 3, name: 'Customizable profile', description: 'Custom theme on your profile', priceMonthly: 2, priceYearly: 20 },
  ];


  const handleAddOnToggle = (addOn) => {
    const updatedAddOns = selectedPlan.addOns ? [...selectedPlan.addOns] : []; 
    const existingIndex = updatedAddOns.findIndex((item) => item.name === addOn.name);

    if (existingIndex !== -1) {
      updatedAddOns.splice(existingIndex, 1);
    } else {
      updatedAddOns.push(addOn);
    }

    setSelectedPlan({ ...selectedPlan, addOns: updatedAddOns });
  };

  return (
    <div className="step active step3" data-step="3">
      <div className="userInputSection">
        <div className="header">
          <h1>Pick add-ons</h1>
          <p>Add-ons help enhance your gaming experience</p>
        </div>

        <form className="stepForm">
          {/* write component for this and then pass props 
            not a good way
          */} 
          {addOnsList.map((addOn) => (
            <div
              key={addOn.id}
              className={`box ${
                selectedPlan.addOns && selectedPlan.addOns.some((item) => item.name === addOn.name) ? 'ad-selected' : ''
              }`}
              onClick={() => handleAddOnToggle(addOn)}
            >
              <input
                type="checkbox"
                id={addOn.name.replace(/\s+/g, '').toLowerCase()}
                checked={selectedPlan.addOns && selectedPlan.addOns.some((item) => item.name === addOn.name)}
                readOnly
              />
              <div className="custom-check"></div>
              <div className="description">
                <label htmlFor={addOn.name.toLowerCase()}>{addOn.name}</label>
                <small>{addOn.description}</small>
              </div>
              <p className="priceAddon">
                +$
                {selectedPlan.duration === 'yearly' ? addOn.priceYearly : addOn.priceMonthly}
                /{selectedPlan.duration === 'yearly' ? 'yr' : 'mo'}
              </p>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}

export default Step3;

