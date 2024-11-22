/* eslint-disable react/prop-types */

import { useEffect } from 'react'
import '../App.css'

function Step2({ selectedPlan, setSelectedPlan }) {
  const planPrices = {
    Arcade: {
      monthly: 9,
      yearly: 90,
    },
    Advanced: {
      monthly: 12,
      yearly: 120,
    },
    Pro: {
      monthly: 15,
      yearly: 150,
    },
  }

  const handlePlanSelect = (plan) => {
    const planCost = planPrices[plan][selectedPlan.duration]
    setSelectedPlan({
      ...selectedPlan,
      plan,
      planCost: `$${planCost}/${selectedPlan.duration === 'monthly' ? 'mo' : 'yr'}`,
    })
  }

  const updatePriceAndOffers = (isChecked) => {
    const planCardsDetails = document.querySelectorAll('.planDetails')

    planCardsDetails.forEach((plan) => {
      const priceTag = plan.querySelector('.priceTag')
      const newPrice = planPrices[plan.querySelector('p').textContent.trim()][isChecked ? 'yearly' : 'monthly']
      priceTag.textContent = `$${newPrice}/${isChecked ? 'yr' : 'mo'}`

      // 2 months offer
      const existingOffer = plan.querySelector('.offer')
      if (isChecked && !existingOffer) {
        const offer = document.createElement('p')
        offer.className = 'offer'
        offer.textContent = '2 months free'
        plan.appendChild(offer)
      } else if (!isChecked && existingOffer) {
        existingOffer.remove()
      }
    })
  }

  const handleDurationToggle = (event) => {
    const isChecked = event.target.checked
    const updatedDuration = isChecked ? 'yearly' : 'monthly'
    const updatedPlanPrice = planPrices[selectedPlan.plan][updatedDuration]
    setSelectedPlan({
      ...selectedPlan,
      duration: updatedDuration,
      planCost: `$${updatedPlanPrice}/${isChecked ? 'yr' : 'mo'}`,
    })
  }


  // check dependency
  useEffect(() => {
    updatePriceAndOffers(selectedPlan.duration === 'yearly')
  }, [selectedPlan.duration])

  return (
    <div className="step active step2" data-step="1">
      <div className="userInputSection">
        <div className="header">
          <h1>Select your plan</h1>
          <p>You have the option of monthly or yearly billing.</p>
        </div>

        <form className="stepForm">
          <div className="planCardWrapper">
            {/* Arcade Plan */}
            <div className={`planCard ${selectedPlan.plan === 'Arcade' ? 'selected' : ''}`}
              onClick={() => handlePlanSelect('Arcade')}>
              <div className="img_wrapper">
                <img src="src/assets/images/icon-arcade.svg" alt="arcade" />
              </div>
              <div className="planDetails">
                <p>Arcade</p>
                <p className="priceTag">{`$${planPrices.Arcade[selectedPlan.duration]}/${selectedPlan.duration === 'monthly' ? 'mo' : 'yr'}`}</p>
              </div>
            </div>

            {/* Advanced Plan */}
            <div className={`planCard ${selectedPlan.plan === 'Advanced' ? 'selected' : ''}`}
              onClick={() => handlePlanSelect('Advanced')}>
              <div className="img_wrapper">
                <img src="src/assets/images/icon-advanced.svg" alt="advanced" />
              </div>
              <div className="planDetails">
                <p>Advanced</p>
                <p className="priceTag">{`$${planPrices.Advanced[selectedPlan.duration]}/${selectedPlan.duration === 'monthly' ? 'mo' : 'yr'}`}</p>
              </div>
            </div>

            {/* Pro Plan */}
            <div className={`planCard ${selectedPlan.plan === 'Pro' ? 'selected' : ''}`}
              onClick={() => handlePlanSelect('Pro')}>
              <div className="img_wrapper">
                <img src="src/assets/images/icon-pro.svg" alt="pro" />
              </div>
              <div className="planDetails">
                <p>Pro</p>
                <p className="priceTag">{`$${planPrices.Pro[selectedPlan.duration]}/${selectedPlan.duration === 'monthly' ? 'mo' : 'yr'}`}</p>
              </div>
            </div>
          </div>
        </form>

        {/* Switcher */}
        <div className="switcher">
          <p className={`monthly ${selectedPlan.duration === 'monthly' ? 'sw-active' : ''}`}>Monthly</p>
          <label className="switch">
            <input type="checkbox"
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
