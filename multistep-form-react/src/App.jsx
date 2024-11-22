//
import { useState, useRef } from 'react'
import Sidebar from './components/Sidebar'
import Step1 from './components/Step1'
import Step2 from './components/Step2'
import Step3 from './components/Step3'
import Step4 from './components/Step4'
import Step5 from './components/Step5'
import ButtonContainer from './components/ButtonContainer'
import './App.css'

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedPlan, setSelectedPlan] = useState({
    plan: 'Arcade',
    planCost: '$9/mo',
    duration: "monthly",
    addOns: [],
    username: '',
    usermail: '',
    userphone: ''
  })

  

  // ref for func
  const validateStep = useRef(null)

  return (
    <div className="body">
      <form id="multistepForm">
        <div className='formContainer'>
          <Sidebar 
              currentStep={currentStep} 
              setCurrentStep={setCurrentStep}
          />
          {
            {
              '1': <Step1 
                      selectedPlan={selectedPlan}
                      setSelectedPlan={setSelectedPlan}
                      validateStep={validateStep}
                    />,
                    '2': <Step2  
                        selectedPlan = {selectedPlan}
                        setSelectedPlan = {setSelectedPlan}   
                    />,
                  '3': <Step3 
                        selectedPlan = {selectedPlan}
                        setSelectedPlan = {setSelectedPlan}  
                    />,
                  '4': <Step4 
                        selectedPlan = {selectedPlan}
                        setSelectedPlan = {setSelectedPlan} 
                    />, 
                  '5': <Step5 />,
            }[currentStep]
          }
          <ButtonContainer 
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            validateStep={validateStep} 
            selectedPlan = {selectedPlan}
            setSelectedPlan = {setSelectedPlan} 
          />
        </div>
      </form>
    </div>
  )
}

export default App
