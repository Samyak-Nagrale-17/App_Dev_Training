/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import '../App.css'
import PlanCard from './PlanCard' 

function Step2({ selectedPlan, setSelectedPlan, validateStep, currentStep, setCurrentStep }) {
  // plan data for each card
  const plans = [
    {
      name: 'Arcade',
      icon: 'src/assets/images/icon-arcade.svg',
      monthly: 9,
      yearly: 90,
    },
    {
      name: 'Advanced',
      icon: 'src/assets/images/icon-advanced.svg',
      monthly: 12,
      yearly: 120,
    },
    {
      name: 'Pro',
      icon: 'src/assets/images/icon-pro.svg',
      monthly: 15,
      yearly: 150,
    },
  ]

  const handlePlanSelect = (planName) => {
    const selectedPlanData = plans.find((p) => p.name === planName)
    const planCost = selectedPlan.duration === 'yearly' ? selectedPlanData.yearly : selectedPlanData.monthly
    setSelectedPlan({
      ...selectedPlan,
      plan: selectedPlanData.name,
      planCost: `$${planCost}/${selectedPlan.duration === 'monthly' ? 'mo' : 'yr'}`,
    })
  }

  // handle duration toggle (monthly/yearly)
  const handleDurationToggle = (event) => {
    const isChecked = event.target.checked
    const updatedDuration = isChecked ? 'yearly' : 'monthly'
    const selectedPlanData = plans.find((p) => p.name === selectedPlan.plan)
    const updatedPlanPrice = updatedDuration === 'yearly' ? selectedPlanData.yearly : selectedPlanData.monthly

    setSelectedPlan({
      ...selectedPlan,
      duration: updatedDuration,
      planCost: `$${updatedPlanPrice}/${isChecked ? 'yr' : 'mo'}`,
    })
  }

  return (
    <div className="step active step2" data-step="1">
      <div className="userInputSection">
        <div className="header">
          <h1>Select your plan</h1>
          <p>You have the option of monthly or yearly billing.</p>
        </div>

        <form className="stepForm">
          <div className="planCardWrapper">
            {plans.map((planData) => (
              <PlanCard
                key={planData.name}
                planData={planData}
                selectedPlan={selectedPlan}
                selected={handlePlanSelect}
                isYearly={selectedPlan.duration === 'yearly'}
              />
            ))}
          </div>
        </form>

        {/* switcher */}
        <div className="switcher">
          <p className={`monthly ${selectedPlan.duration === 'monthly' ? 'sw-active' : ''}`}>Monthly</p>
          <label className="switch">
            <input 
              type="checkbox"
              checked={selectedPlan.duration === 'yearly'}
              onChange={handleDurationToggle}
            />
            <span className="slider round"></span>
          </label>
          <p className={`yearly ${selectedPlan.duration === 'yearly' ? 'sw-active' : ''}`}>Yearly</p>
        </div>
      </div>
    </div>
  )
}

export default Step2


