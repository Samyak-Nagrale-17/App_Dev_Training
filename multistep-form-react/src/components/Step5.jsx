/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import '../App.css'

function Step5({ selectedPlan, setSelectedPlan, validateStep, currentStep, setCurrentStep }){
    return(
        <div className="step active step5" data-step="4">    
                <div className="userInputSection">
                    <img src="src/assets/images/icon-thank-you.svg" alt="thank-you-img" />

                    <div className="header">
                        <h1>Thank you!</h1>
                        <p>
                            Thanks for confirming your subscription! We hope you have fun 
                            using our platform. If you ever need support, please feel free 
                            to email us at support@loremgaming.com.
                        </p>
                    </div>
                </div>
        </div>
    )
}

export default Step5
