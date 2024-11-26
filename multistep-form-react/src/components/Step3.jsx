/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import AddOnBox from './AddOnBox'
import '../App.css'

function Step3({ selectedPlan, setSelectedPlan, validateStep, currentStep, setCurrentStep }) {
  const addOnsList = [
    { name: 'Online service', description: 'Access to multiplayer games', priceMonthly: 1, priceYearly: 10 },
    { name: 'Larger storage', description: 'Extra 1TB of cloud save', priceMonthly: 2, priceYearly: 20 },
    { name: 'Customizable profile', description: 'Custom theme on your profile', priceMonthly: 2, priceYearly: 20 },
  ]

  return (
    <div className="step active step3" data-step="3">
      <div className="userInputSection">
        <div className="header">
          <h1>Pick add-ons</h1>
          <p>Add-ons help enhance your gaming experience</p>
        </div>

        <form className="stepForm">
          {addOnsList.map((addOn) => (
            <AddOnBox
              key={addOn.name}
              addOn={addOn}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
          ))}
        </form>
      </div>
    </div>
  )
}

export default Step3
