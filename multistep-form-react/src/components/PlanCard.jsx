// import React from 'react';

// function PlanCard({ planData, selectedPlan, onSelect }) {
//   const { name, icon, monthly, yearly } = planData;
//   const isSelected = selectedPlan.plan === name;
//   const duration = selectedPlan.duration;
//   const planCost = duration === 'yearly' ? yearly : monthly;

//   return (
//     <div 
//       className={`planCard ${isSelected ? 'selected' : ''}`}
//       onClick={() => onSelect(name)}
//     >
//       <div className="img_wrapper">
//         <img src={icon} alt={name.toLowerCase()} />
//       </div>
//       <div className="planDetails">
//         <p>{name}</p>
//         <p className="priceTag">{`$${planCost}/${duration === 'monthly' ? 'mo' : 'yr'}`}</p>
//       </div>
//     </div>
//   );
// }

// export default PlanCard;





// NEW SHIT GOES HERE
import React from 'react';

function PlanCard({ planData, selectedPlan, onSelect, isYearly }) {
  const { name, icon, monthly, yearly } = planData;
  const isSelected = selectedPlan.plan === name;
  const duration = selectedPlan.duration;
  const planCost = duration === 'yearly' ? yearly : monthly;

  return (
    <div 
      className={`planCard ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(name)}
    >
      <div className="img_wrapper">
        <img src={icon} alt={name.toLowerCase()} />
      </div>
      <div className="planDetails">
        <p>{name}</p>
        <p className="priceTag">{`$${planCost}/${duration === 'monthly' ? 'mo' : 'yr'}`}</p>
        {isYearly && <p className="offer">2 months free</p>} {/* Show offer when yearly is selected */}
      </div>
    </div>
  );
}

export default PlanCard;
