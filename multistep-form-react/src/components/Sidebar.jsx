/* eslint-disable react/prop-types */
// 2 components here
// the sidebar and the 4 steps inside the sidebar

// import './App.css'
// import { useState,useContext } from 'react'
import '../App.css'


function IconStep({ currStepNumber, currStepTitle, currStepDescription, currentStep, setCurrentStep }) {
    const handleCurrentStepIcononClick = () => setCurrentStep(currentStep = currStepNumber)

    return (
        <div className="currStep">
            {/* conditionally add currStepActive class */}
            <div className={`currStepIcon ${currentStep === currStepNumber ? 'currStepActive' : ''}`}
                onClick={handleCurrentStepIcononClick}
            >
                {currStepNumber}
            </div>
            <div className="currStepDetails">
                <span className="currStepSpan">{currStepTitle}</span>
                <b>{currStepDescription}</b>
            </div>
        </div>
    );
}


function Sidebar({ currentStep ,setCurrentStep}) {
    return (
        <div className="sidebar">
            <IconStep 
                currStepNumber={1}
                currStepTitle={"STEP 1"}
                currStepDescription={"YOUR INFO"}
                currentStep={currentStep}
                setCurrentStep = {setCurrentStep}
            />

            <IconStep 
                currStepNumber={2}
                currStepTitle={"STEP 2"}
                currStepDescription={"SELECT PLAN"}
                currentStep={currentStep}
                setCurrentStep = {setCurrentStep}
            />

            <IconStep 
                currStepNumber={3}
                currStepTitle={"STEP 3"}
                currStepDescription={"ADD-ONS"}
                currentStep={currentStep}
                setCurrentStep = {setCurrentStep}
            />

            <IconStep 
                currStepNumber={4}
                currStepTitle={"STEP 4"}
                currStepDescription={"SUMMARY"}
                currentStep={currentStep}
                setCurrentStep = {setCurrentStep}
            />
        </div>
    );
}


export default Sidebar;