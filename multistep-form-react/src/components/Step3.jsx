// import '../App.css'

// function Step3({selectedPlan, setSelectedPlan}){

//     return(
//         <div className="step active step3" data-step="2"> 
//             <div className="userInputSection">
//                 <div className="header">
//                     <h1>Pick add-ons</h1>
//                     <p>Add-ons help enhance your gaming experience</p>
//                 </div>
            
//                 <form className="stepForm">        
//                     <div className='box'  data-id="1">
//                         <input type="checkbox" id="online" />
//                         <div className="custom-check"></div>
//                         <div className="description">
//                             <label htmlFor="online">Online service</label>
//                             <small>Access to multiplayer games</small>
//                         </div>
//                         <p className="priceAddon">+$1/mo</p> 
//                     </div>

//                     <div className="box" data-id="2">
//                         <input type="checkbox" id="larger" />
//                         <div className="custom-check"></div>
//                         <div className="description">
//                             <label htmlFor="larger">Larger storage</label>
//                             <small>Extra 1TB of cloud save</small>
//                         </div>
//                         <p className="priceAddon">+$2/mo</p> 
//                     </div>

//                     <div className="box" data-id="3">
//                         <input type="checkbox" id="profile" />
//                         <div className="custom-check"></div>
//                         <div className="description">
//                             <label htmlFor="profile">Customizable profile</label>
//                             <small>Custom theme on your profile</small>
//                         </div> 
//                         <p className="priceAddon">+$2/mo</p> 
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Step3

// import '../App.css';

// function Step3({ selectedPlan, setSelectedPlan }) {
//   // Add-on options with monthly and yearly prices
//   const addOnsList = [
//     { id: 1, name: 'Online service', description: 'Access to multiplayer games', priceMonthly: 1, priceYearly: 10 },
//     { id: 2, name: 'Larger storage', description: 'Extra 1TB of cloud save', priceMonthly: 2, priceYearly: 20 },
//     { id: 3, name: 'Customizable profile', description: 'Custom theme on your profile', priceMonthly: 2, priceYearly: 20 },
//   ];

//   // Handle Add-On Selection
//   const handleAddOnToggle = (addOn) => {
//     const updatedAddOns = selectedPlan.addOns ? [...selectedPlan.addOns] : []; // Ensure addOns is an array
//     const existingIndex = updatedAddOns.findIndex((item) => item.name === addOn.name);

//     if (existingIndex !== -1) {
//       // Remove add-on if already selected
//       updatedAddOns.splice(existingIndex, 1);
//     } else {
//       // Add new add-on if not already selected
//       updatedAddOns.push(addOn);
//     }

//     setSelectedPlan({ ...selectedPlan, addOns: updatedAddOns });
//   };

//   return (
//     <div className="step active step3" data-step="3">
//       <div className="userInputSection">
//         <div className="header">
//           <h1>Pick add-ons</h1>
//           <p>Add-ons help enhance your gaming experience</p>
//         </div>

//         <form className="stepForm">
//           {addOnsList.map((addOn) => (
//             <div
//               key={addOn.id}
//               className={`box ${
//                 selectedPlan.addOns && selectedPlan.addOns.some((item) => item.name === addOn.name) ? 'ad-selected' : ''
//               }`}
//               onClick={() => handleAddOnToggle(addOn)}
//             >
//               <input
//                 type="checkbox"
//                 id={addOn.name.replace(/\s+/g, '').toLowerCase()}
//                 checked={selectedPlan.addOns && selectedPlan.addOns.some((item) => item.name === addOn.name)}
//                 readOnly // Reflect state only
//               />
//               <div className="custom-check"></div>
//               <div className="description">
//                 <label htmlFor={addOn.name.replace(/\s+/g, '').toLowerCase()}>{addOn.name}</label>
//                 <small>{addOn.description}</small>
//               </div>
//               <p className="priceAddon">
//                 +$
//                 {selectedPlan.duration === 'yearly' ? addOn.priceYearly : addOn.priceMonthly}
//                 /{selectedPlan.duration === 'yearly' ? 'yr' : 'mo'}
//               </p>
//             </div>
//           ))}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Step3;






















// src/components/Step3.jsx
// import React from 'react';
// import AddOnBox from './AddOnBox'; // Import the AddOnBox component
// import '../App.css';

// function Step3({ selectedPlan, setSelectedPlan }) {
//   // Add-on options with monthly and yearly prices
//   const addOnsList = [
//     { id: 1, name: 'Online service', description: 'Access to multiplayer games', priceMonthly: 1, priceYearly: 10 },
//     { id: 2, name: 'Larger storage', description: 'Extra 1TB of cloud save', priceMonthly: 2, priceYearly: 20 },
//     { id: 3, name: 'Customizable profile', description: 'Custom theme on your profile', priceMonthly: 2, priceYearly: 20 },
//   ];

//   return (
//     <div className="step active step3" data-step="3">
//       <div className="userInputSection">
//         <div className="header">
//           <h1>Pick add-ons</h1>
//           <p>Add-ons help enhance your gaming experience</p>
//         </div>

//         <form className="stepForm">
//           {addOnsList.map((addOn) => (
//             <AddOnBox
//               key={addOn.id}
//               addOn={addOn}
//               selectedPlan={selectedPlan}
//               setSelectedPlan={setSelectedPlan}
//             />
//           ))}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Step3;


















// Step3.jsx
import React from 'react';
import AddOnBox from './AddOnBox'; // Import the AddOnBox component
import '../App.css';

function Step3({ selectedPlan, setSelectedPlan }) {
  // Add-on options with monthly and yearly prices
  const addOnsList = [
    { name: 'Online service', description: 'Access to multiplayer games', priceMonthly: 1, priceYearly: 10 },
    { name: 'Larger storage', description: 'Extra 1TB of cloud save', priceMonthly: 2, priceYearly: 20 },
    { name: 'Customizable profile', description: 'Custom theme on your profile', priceMonthly: 2, priceYearly: 20 },
  ];

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
              // key={addOn.name} // Use name as key since it's unique // no need of this key bullshit.
              addOn={addOn}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
          ))}
        </form>
      </div>
    </div>
  );
}

export default Step3;
