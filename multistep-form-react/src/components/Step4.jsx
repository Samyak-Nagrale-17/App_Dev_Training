// import '../App.css'
// function Step4({ selectedPlan, setSelectedPlan }){
     
//     return(
//         <div className="step active step4" data-step="3">            
//             <div className="userInputSection">
//                 <div className="header">
//                     <h1>Finishing up</h1>
//                     <p>Double-check everything looks OK before confirming</p>
//                 </div>

//                 <div className="orderSummary">
//                     <div className="orderDetails">
//                         <div className="planSummary">
//                             <div className="planSummaryText">
//                                 <p className="chosenPlan">Arcade (Monthly)</p>
//                                 <a href="#" id="changePlanLink">Change</a>
//                             </div>
//                             <p className="planSummaryPrice">$9/mo</p>
//                         </div>
                        
//                         <hr id="hrOrderSummary" />

//                         <div className="addOnWrapper">
//                             {/* selected add-ons will go here*/}
//                         </div>
                        
//                     </div>

//                     <div className="total">
//                         <p className="orderText">Total (per month)</p>
//                         <p className="totalPrice">+$12/mo</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Step4


import { useEffect } from 'react';
import '../App.css';

function Step4({ selectedPlan, setSelectedPlan, validateStep,currentStep,setCurrentStep}) {
  const { plan, planCost, duration, addOns } = selectedPlan;

  // Convert the planCost from string to number
  const planCostValue = parseFloat(planCost.replace(/[^0-9.]/g, '')); // Extracts numeric value from the cost string

  // Calculate the total add-ons cost
  const addOnsTotal = addOns.reduce((sum, addOn) => {
    const addOnPrice = duration === 'yearly' ? addOn.priceYearly : addOn.priceMonthly;
    return sum + addOnPrice;
  }, 0);

  // Calculate the total cost
  const totalCost = planCostValue + addOnsTotal;

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
                <a href='./Step2.jsx' id="changePlanLink" 
                 onClick={(e) => {
                    e.preventDefault(); // Prevent link navigation
                    setCurrentStep(2);  // Set step to 2
                  }} 
                >Change</a>
              </div>
              <p className="planSummaryPrice">{planCost}</p>
            </div>
            
            <hr id="hrOrderSummary" />

            <div className="addOnWrapper">
              {addOns.length > 0 ? (
                addOns.map((addOn, index) => (
                  <div className="addOn" key={index}>
                    <div className="addOnText">{addOn.name}</div>
                    <div className="addOnPrice">
                      +${duration === 'yearly' ? addOn.priceYearly : addOn.priceMonthly}/{duration === 'yearly' ? 'yr' : 'mo'}
                    </div>
                  </div>
                ))
              ) : (
                <p>No add-ons selected</p>
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
  );
}

export default Step4;
