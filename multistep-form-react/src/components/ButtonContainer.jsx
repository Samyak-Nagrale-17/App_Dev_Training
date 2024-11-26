/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import '../App.css'

function ButtonContainer({ currentStep, setCurrentStep, validateStep, selectedPlan ,setSelectedPlan}) {

  const nextStep = (e) => {
    // console.log(selectedPlan)
    e.preventDefault()

    // validation for step1
    if (currentStep === 1 && !validateStep.current()) {
      return 
    }
    
    // check if all fields filled before submission
    if (currentStep === 4) {
      // from selectedPlan
      const { username, usermail, userphone } = selectedPlan
      if (!username || !usermail || !userphone) {
        return 
      }
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }

    // reset form on thank you page i.e. after form submission
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
  }

  const prevStep = (e) => {
    e.preventDefault()
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

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
  )
}

export default ButtonContainer
