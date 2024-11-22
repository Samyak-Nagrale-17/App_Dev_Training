/* eslint-disable react/prop-types */
import '../App.css'

function Step4({ selectedPlan, setSelectedPlan }) {
  const { plan, planCost, duration, addOns } = selectedPlan

  const planCostValue = parseFloat(planCost.replace(/[^0-9.]/g, ''))

  const addOnsTotal = addOns.reduce((sum, addOn) => {
    const addOnPrice = duration === 'yearly' ? addOn.priceYearly : addOn.priceMonthly
    return sum + addOnPrice
  }, 0)

  const totalCost = planCostValue + addOnsTotal

  return (
    <div className="step active step4" data-step="3">
      <div className="userInputSection">
        <div className="header">
          <h1>Finishing up</h1>
          <p>Double-check everything looks OK before confirming</p>
        </div>

        <div className="orderSummary">
          <div className="orderDetails">
            <div className="planSummary">
              <div className="planSummaryText">
                <p className="chosenPlan">
                  {plan} ({duration.charAt(0).toUpperCase() + duration.slice(1)})
                </p>
                <a href='./Step2.jsx' id="changePlanLink">Change</a>
              </div>
              <p className="planSummaryPrice">{planCost}</p>
            </div>
            
            <hr id="hrOrderSummary" />

            <div className="addOnWrapper">
              {addOns.length > 0 ? (
                addOns.map((addOn, index) => (
                  <div className="addOn" key={index}>
                    <div className="addOntext">{addOn.name}</div>
                    <div className="addOnPrice">
                      +${duration === 'yearly' ? addOn.priceYearly : addOn.priceMonthly}/{duration === 'yearly' ? 'yr' : 'mo'}
                    </div> 
                  </div> 
                )) 
              ) : ( 
                // no addons were selected -> leave it blank
                // <p>No add-ons selected</p>
                <></>
              )}
            </div>
          </div>

          <div className="total">
            <p className="orderText">Total ({duration === 'yearly' ? 'per year' : 'per month'})</p>
            <p className="totalPrice">
              ${totalCost}/{duration === 'yearly' ? 'yr' : 'mo'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step4