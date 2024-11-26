import { useState, useRef, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Step1 from './components/Step1'
import Step2 from './components/Step2'
import Step3 from './components/Step3'
import Step4 from './components/Step4'
import Step5 from './components/Step5'
import ButtonContainer from './components/ButtonContainer'
import './App.css'

function App() {
  // load saved data from localStorage or use defaults
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem('currentStep')
    return savedStep ? parseInt(savedStep, 10) : 1
  })

  const [selectedPlan, setSelectedPlan] = useState(() => {
    const savedPlan = localStorage.getItem('selectedPlan')
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
        }
  })

  // save currentStep, selectedPlan to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentStep', currentStep)
  }, [currentStep])
  useEffect(() => {
    localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan))
  }, [selectedPlan])

  const validateStep = useRef(null)

  // common props shared across steps
  const commonProps = { selectedPlan, setSelectedPlan, validateStep, currentStep, setCurrentStep }

  const renderFormSteps = () => {
    switch (currentStep) {
      case 1:
        return <Step1 {...commonProps} />
      case 2:
        return <Step2 {...commonProps} />
      case 3:
        return <Step3 {...commonProps} />
      case 4:
        return <Step4 {...commonProps} />
      case 5:
        return <Step5 {...commonProps} />
      default:
        return null
    }
  }

  return (
    <div className="body">
      <form id="multistepForm">
        <div className="formContainer">
          <Sidebar currentStep={currentStep} setCurrentStep={setCurrentStep} />
          {renderFormSteps()} 
          <ButtonContainer
            {...commonProps} 
          />
        </div>
      </form>
    </div>
  )
}

export default App
