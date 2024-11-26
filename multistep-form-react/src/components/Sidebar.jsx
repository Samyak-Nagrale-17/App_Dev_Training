/* eslint-disable react/prop-types */

import '../App.css'

function IconStep({ currStepNumber, currStepTitle, currStepDescription,commonProps }) {
    const handleIconClick = (e) => {
        // check for validation on currentStep === 1
        if(commonProps.currentStep === 1 && !commonProps.validateStep.current()){
            return
        }
        // validation is passed
        commonProps.setCurrentStep(commonProps.currentStep = currStepNumber)

        // form is submitted, only click on
        if(commonProps.currentStep === 5){ 
            e.preventDefault()
            console.log('currentStep is 5, from Sidebar Component')
        
            // if(e.target.currStepNumber === 1){
                // commonProps.setCurrentStep(commonProps.currentStep = 1)
            // }
        }                    
    }

    return (
        <div className="currStep">
            {/* conditionally add currStepActive class */}
            <div className={`currStepIcon ${commonProps.currentStep === currStepNumber ? 'currStepActive' : ''}`}
                onClick={handleIconClick}
            > 
                {currStepNumber}
            </div>
            <div className="currStepDetails">
                <span className="currStepSpan">{currStepTitle}</span>
                <b>{currStepDescription}</b>
            </div>
        </div>
    )
}


function Sidebar({ selectedPlan, setSelectedPlan, validateStep, currentStep, setCurrentStep }) {
    // common props shared across steps
    const commonProps = {selectedPlan, setSelectedPlan, validateStep, currentStep, setCurrentStep}

    return (
        <div className="sidebar">
            <IconStep 
                currStepNumber={1}
                currStepTitle={"STEP 1"}
                currStepDescription={"YOUR INFO"}
                commonProps = {commonProps}                
            />

            <IconStep 
                currStepNumber={2}
                currStepTitle={"STEP 2"}
                currStepDescription={"SELECT PLAN"}
                commonProps = {commonProps}
            />

            <IconStep 
                currStepNumber={3}
                currStepTitle={"STEP 3"}
                currStepDescription={"ADD-ONS"}
                commonProps = {commonProps}
            />

            <IconStep 
                currStepNumber={4}
                currStepTitle={"STEP 4"}
                currStepDescription={"SUMMARY"}
                commonProps = {commonProps}
            />
        </div>
    )
}


export default Sidebar
