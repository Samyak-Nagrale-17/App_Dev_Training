// // import '../App.css'
// // import { useState } from 'react'
// // function ButtonContainer({currentStep, setCurrentStep}){

// //     // const {currentStep, setCurrentStep} =useState(currentStep,setCurrentStep)
// //     const nextStep = (e) => {
// //         e.preventDefault()
// //         if(currentStep >= 5){
// //             // hide the button on step5
// //             // e.target.classList.add('hideButton')
// //             return
// //         } 
// //         setCurrentStep(currentStep + 1)
// //     }

// //     const prevStep = (e) => {
// //         e.preventDefault()
// //         if(currentStep <= 1) return
// //         else if(currentStep >= 5){
// //             // e.target.classList.add('hideButton')
// //             return
// //         } 
// //         setCurrentStep(currentStep - 1);
// //     }

// //     return( 
// //         <div className="buttonContainer">
// //                 <button id="prevButton" onClick={prevStep} className={currentStep === 1 ? 'hideButton' : ''}>Go Back</button>
// //                 <button id="nextButton" onClick={nextStep} className={currentStep === 4 ? 'confirm' : ''}>{currentStep === 4 ? 'Confirm' : 'Next Step'}</button>
// //         </div> 
// //     )
// // }

// // export default ButtonContainer


// import '../App.css'

// function ButtonContainer({currentStep, setCurrentStep}) {

//     const nextStep = (e) => {
//         e.preventDefault()
//         // Allow moving to step 5 from step 4
//         if(currentStep < 5) {
//             setCurrentStep(currentStep + 1)
//         }
//     }

//     const prevStep = (e) => {
//         e.preventDefault()
//         if(currentStep > 1) {
//             setCurrentStep(currentStep - 1)
//         } 
//     }

//     return( 
//         <div className="buttonContainer">
//             <button 
//                 id="prevButton" 
//                 onClick={prevStep} 
//                 className={currentStep === 1 || currentStep === 5 ? 'hideButton' : ''}>
//                 Go Back
//             </button>
//             <button 
//                 id="nextButton" 
//                 onClick={nextStep} 
//                 className={currentStep === 5 ? 'hideButton' : ''}>
//                 {currentStep === 4 ? 'Confirm' : 'Next Step'}
//             </button>
//         </div> 
//     )
// }

// export default ButtonContainer 



// // NEW SHIT WILL GO HERE
// import '../App.css';

// function ButtonContainer({ currentStep, setCurrentStep, validateStep }) {

//   const nextStep = (e) => {
//     e.preventDefault();

//     // Validate only on step 1 before proceeding
//     if (currentStep === 1 && !validateStep.current()) {
//       return; // Stop if validation fails
//     }
    
//     // Allow moving to the next step
//     if (currentStep < 5) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = (e) => {
//     e.preventDefault();
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   return ( 
//     currentStep < 5 && (
//       <div className="buttonContainer">
//         <button 
//           id="prevButton" 
//           onClick={prevStep} 
//           className={currentStep === 1 ? 'hideButton' : ''}
//         >
//           Go Back
//         </button>
//         <button 
//           id="nextButton" 
//           onClick={nextStep}
//           className={currentStep === 4 ? 'confirm' : ''}
//         >
//           {currentStep === 4 ? 'Confirm' : 'Next Step'}
//         </button>
//       </div> 
//     )
//   );
// }

// export default ButtonContainer;





// THE NEWEST SHIT WILL GO HERE
import { useEffect } from 'react';
import '../App.css';

function ButtonContainer({ currentStep, setCurrentStep, validateStep, selectedPlan ,setSelectedPlan}) {

  const nextStep = (e) => {
    // console.log(selectedPlan)
    e.preventDefault();

    // Validate only on step 1 before proceeding
    if (currentStep === 1 && !validateStep.current()) {
      return; // Stop if validation fails
    }
    
    // Validate on step 4 before confirming
    if (currentStep === 4) {
      const { username, usermail, userphone } = selectedPlan;
      if (!username || !usermail || !userphone) {
        alert('Please complete all personal information fields before confirming.');
        return; // Prevent proceeding if fields are missing
      }
    }

    // Allow moving to the next step
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }

    // reset form on thank you page
    if(currentStep >= 4){
      setSelectedPlan({
        plan: 'Arcade',
        planCost: '$9/mo',
        duration: 'monthly',
        addOns: [],
        username: null,
        usermail: null,
        userphone: null,
      })
    }
  };

  const prevStep = (e) => {
    e.preventDefault();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    selectedPlan
  }, [selectedPlan])

  return ( 
    currentStep < 5 && (
      <div className="buttonContainer">
        <button 
          id="prevButton" 
          onClick={prevStep} 
          className={currentStep === 1 ? 'hideButton' : ''}
        >
          Go Back
        </button>
        <button 
          id="nextButton" 
          onClick={nextStep}
          className={currentStep === 4 ? 'confirm' : ''}
        >
          {currentStep === 4 ? 'Confirm' : 'Next Step'}
        </button>
      </div> 
    )
  );
}

export default ButtonContainer;
