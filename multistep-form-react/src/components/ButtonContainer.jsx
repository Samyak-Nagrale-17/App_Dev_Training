/* eslint-disable react/prop-types */
//
import { useEffect } from 'react'
import '../App.css'

function ButtonContainer({ currentStep, setCurrentStep, validateStep,selectedPlan, setSelectedPlan }) {

  const nextStep = (e) => {
    e.preventDefault()

    // validate step1.if not valid, dont go to next step
    if (currentStep === 1 && !validateStep.current()) {
      return
    }
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }

    // reset form on thank you page
    if(currentStep >= 4){
      setSelectedPlan({
        plan: 'Arcade',
        planCost: '$9/mo',
        duration: "monthly",
        addOns: [],
        username: '',
        usermail: '',
        userphone: ''
      })
    } 
    
    // dont submit form if no userdetails
    // let personalInfoFilled = (!selectedPlan.username.trim() || !selectedPlan.usermail.trim() || !selectedPlan.userphone.trim()) ?false : true
    // if(currentStep <=4 && personalInfoFilled){
    //   return
    // }
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
