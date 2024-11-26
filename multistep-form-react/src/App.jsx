// import Sidebar from './components/Sidebar'
// import Step1 from './components/Step1'
// import Step2 from './components/Step2'
// import Step3 from './components/Step3'
// import Step4 from './components/Step4'
// import Step5 from './components/Step5'
// import ButtonContainer from './components/ButtonContainer'
// import './App.css'
// import { useState } from 'react'

// function App() {
//   // current step
//   const [currentStep, setCurrentStep] = useState(1) 

//   // selected plan details object
//   const [selectedPlan, setSelectedPlan] = useState({
//       plan: 'Arcade',
//       planCost: '$9/mo',
//       duration: "monthly",
//       addOns: [],
//       username: null,
//       usermail: null,
//       userphone: null
//     }
//   )


  
//   return(
//     <div className="body">
//       <form id="multistepForm">
//             <div className='formContainer'>
//               <Sidebar props = {currentStep}/>

//               {
//                 {
//                   '1': <Step1 
//                         selectedPlan = {selectedPlan}
//                         setSelectedPlan = {setSelectedPlan}     
                    
//                     />,
//                   '2': <Step2  
//                         selectedPlan = {selectedPlan}
//                         setSelectedPlan = {setSelectedPlan}   
//                     />,
//                   '3': <Step3 
//                         selectedPlan = {selectedPlan}
//                         setSelectedPlan = {setSelectedPlan}  
//                     />,
//                   '4': <Step4 
//                         selectedPlan = {selectedPlan}
//                         setSelectedPlan = {setSelectedPlan} 
//                     />, 
//                   '5': <Step5 
//                         selectedPlan = {selectedPlan}
//                         setSelectedPlan = {setSelectedPlan} 
//                   />,
//                 }[currentStep]
//               }
              
//               <ButtonContainer 
//                 currentStep = {currentStep}
//                 setCurrentStep = {setCurrentStep}
//               />
//             </div>
//           </form>
//     </div>     
//   )
// }

// export default App



// NEW SHIT WILL GO HERE
// import { useState, useRef } from 'react';
// import Sidebar from './components/Sidebar';
// import Step1 from './components/Step1';
// import Step2 from './components/Step2';
// import Step3 from './components/Step3';
// import Step4 from './components/Step4';
// import Step5 from './components/Step5';

// // import other steps
// import ButtonContainer from './components/ButtonContainer';
// import './App.css';

// function App() {
//   const [currentStep, setCurrentStep] = useState(1);

//   const [selectedPlan, setSelectedPlan] = useState({
//     plan: 'Arcade',
//     planCost: '$9/mo',
//     duration: "monthly",
//     addOns: [],
//     username: null,
//     usermail: null,
//     userphone: null
//   });

//   // Ref for passing validation function
//   const validateStep = useRef(null);

//   return (
//     <div className="body">
//       <form id="multistepForm">
//         <div className='formContainer'>
//           <Sidebar currentStep={currentStep} />
//           {
//             {
//               '1': <Step1 
//                       selectedPlan={selectedPlan}
//                       setSelectedPlan={setSelectedPlan}
//                       validateStep={validateStep}
//                     />,
//                     '2': <Step2  
//                         selectedPlan = {selectedPlan}
//                         setSelectedPlan = {setSelectedPlan}   
//                     />,
//                   '3': <Step3 
//                         selectedPlan = {selectedPlan}
//                         setSelectedPlan = {setSelectedPlan}  
//                     />,
//                   '4': <Step4 
//                         selectedPlan = {selectedPlan}
//                         setSelectedPlan = {setSelectedPlan} 
//                     />, 
//                   '5': <Step5 
//                         selectedPlan = {selectedPlan}
//                         setSelectedPlan = {setSelectedPlan} 
//                   />,
//               // other steps
//             }[currentStep]
//           }
//           <ButtonContainer 
//             currentStep={currentStep}
//             setCurrentStep={setCurrentStep}
//             validateStep={validateStep} // Pass validation function
//           />
//         </div>
//       </form>
//     </div>
//   );
// }

// export default App;






/// NEWER SHIT GOES HERE
// import { useState, useRef } from 'react';
// import Sidebar from './components/Sidebar';
// import Step1 from './components/Step1';
// import Step2 from './components/Step2';
// import Step3 from './components/Step3';
// import Step4 from './components/Step4';
// import Step5 from './components/Step5';
// import ButtonContainer from './components/ButtonContainer';
// import './App.css';

// function App() {
//   const [currentStep, setCurrentStep] = useState(1);

//   const [selectedPlan, setSelectedPlan] = useState({
//     plan: 'Arcade',
//     planCost: '$9/mo',
//     duration: 'monthly',
//     addOns: [],
//     username: null,
//     usermail: null,
//     userphone: null,
//   });

//   // Ref for passing validation function
//   const validateStep = useRef(null);

//   // Common props shared across steps
//   const commonProps = { selectedPlan, setSelectedPlan, validateStep,currentStep,setCurrentStep };

//   // Function to render the current step
//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return <Step1 {...commonProps} />;
//       case 2:
//         return <Step2 {...commonProps} />;
//       case 3:
//         return <Step3 {...commonProps} />;
//       case 4:
//         return <Step4 {...commonProps} />;
//       case 5:
//         return <Step5 {...commonProps} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="body">
//       <form id="multistepForm">
//         <div className="formContainer">
//           <Sidebar currentStep={currentStep}  setCurrentStep = {setCurrentStep}/>
//           {renderStep()}
//           <ButtonContainer
//             currentStep={currentStep}
//             setCurrentStep={setCurrentStep}
//             validateStep={validateStep} // Pass validation function
//             selectedPlan={selectedPlan}
//             setSelectedPlan = {setSelectedPlan}
//           />
//         </div>
//       </form>
//     </div>
//   );
// }

// export default App;




// latest local storage shit

import { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import ButtonContainer from './components/ButtonContainer';
import './App.css';

function App() {
  // Load saved data from localStorage or use defaults
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem('currentStep');
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  const [selectedPlan, setSelectedPlan] = useState(() => {
    const savedPlan = localStorage.getItem('selectedPlan');
    return savedPlan
      ? JSON.parse(savedPlan)
      : {
          plan: 'Arcade',
          planCost: '$9/mo',
          duration: 'monthly',
          addOns: [],
          username: null,
          usermail: null,
          userphone: null,
        };
  });

  // Save currentStep to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentStep', currentStep);
  }, [currentStep]);

  // Save selectedPlan to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));
  }, [selectedPlan]);

  // Ref for passing validation function
  const validateStep = useRef(null);

  // Common props shared across steps
  const commonProps = { selectedPlan, setSelectedPlan, validateStep, currentStep, setCurrentStep };

  // Function to render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 {...commonProps} />;
      case 2:
        return <Step2 {...commonProps} />;
      case 3:
        return <Step3 {...commonProps} />;
      case 4:
        return <Step4 {...commonProps} />;
      case 5:
        return <Step5 {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="body">
      <form id="multistepForm">
        <div className="formContainer">
          <Sidebar currentStep={currentStep} setCurrentStep={setCurrentStep} />
          {renderStep()}
          <ButtonContainer
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            validateStep={validateStep} // Pass validation function
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        </div>
      </form>
    </div>
  );
}

export default App;
