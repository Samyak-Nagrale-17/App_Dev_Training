const regForm = document.querySelector("#multistepForm")
const steps = document.querySelectorAll(".step")
const prevButtons = document.querySelectorAll("#prevButton")
const nextButtons = document.querySelectorAll("#nextButton")
const confirmButton = document.querySelector("#confirmButton")

const sidebarStepIcons = document.querySelectorAll(".currStepsIcon")

// const toggleMonthlyYearlyButton = document.querySelector("#toggleMonthlyYearlyButton")

// toggleMonthlyYearlyButton.addEventListener('click', toggleMonthly)

// shows current tab to open
let currentStep = 0
// updateButtons()

// confirmButton.addEventListener('click', (event)=>{
//     event.preventDefault()
//     console.log("clicked on confirm button")
//     updateButtons()
// })
// function toggleMonthly(){
//     steps.classList.add("monthly")
//     return
// }

let prevButtonsArray = Array.from(prevButtons)
let nextButtonsArray = Array.from(nextButtons)

prevButtonsArray = prevButtonsArray.filter((prevButton)=>{
    prevButton.addEventListener('click', (event) => {
        event.preventDefault();
        console.log("current step: ",currentStep)
        console.log("length of steps: ",steps.length);
        steps[currentStep].classList.remove('active') 
        console.log(sidebarStepIcons[currentStep])
        currentStep += -1
        steps[currentStep].classList.add('active')
        // toggleCurrentTask(currentStep)
        updateButtons()
    })
})

nextButtonsArray = nextButtonsArray.filter((nextButton)=>{
    nextButton.addEventListener('click', (event)=>{
        event.preventDefault();
        console.log("current step: ",currentStep)
        console.log("length of steps: ",steps.length);
        
        steps[currentStep].classList.remove('active')
        console.log("sidebar currvalue: ",sidebarStepIcons[currentStep])
        currentStep += 1
        console.log(currentStep)
        steps[currentStep].classList.add('active')
        console.log(steps[currentStep])
        // toggleCurrentTask(currentStep)
        updateButtons()
    })
})


// function addEventHandler(){

    // nextButton.addEventListener('click', (event)=>{
    //     event.preventDefault();
    //     console.log("current step: ",currentStep)
    //     console.log("length of steps: ",steps.length);
        
    //     steps[currentStep].classList.remove('active')
    //     console.log("sidebar currvalue: ",sidebarStepIcons[currentStep])
    //     currentStep += 1
    //     console.log(currentStep)
    //     steps[currentStep].classList.add('active')
    //     console.log(steps[currentStep])
    //     // toggleCurrentTask(currentStep)
    //     updateButtons()
    // })
    
    // prevButton.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     console.log("current step: ",currentStep)
    //     console.log("length of steps: ",steps.length);
    //     steps[currentStep].classList.remove('active') 
    //     console.log(sidebarStepIcons[currentStep])
    //     currentStep += -1
    //     steps[currentStep].classList.add('active')
    //     // toggleCurrentTask(currentStep)
    //     updateButtons()
    // })
// }


function updateButtons(){
    console.log(`value of current value: ${currentStep}  \n length of steps: ${steps.length}`)
    // for previous button
    if(currentStep == 0){
        prevButton.style.display = "none";
    }
    else{
        prevButton.style.display = "inline-block";
    }

    // this is breaking
    // for next button
    if(currentStep == steps.length - 1){
        nextButton.style.display = "none"
        confirmButton.style.display = "inline-block"
        // nextButton.innerHTML = "Confirm"
    }else{
        nextButton.style.display = "inline-block"
        confirmButton.style.display = "none"
    }
    //for confirm button
}

//show the current step
function toggleCurrentTask(currentStep){
    sidebarStepIcons[currentStep-1].classList.toggle("currStep")
    return
}


// validate the user input details
function validateUserInput(){
    //const { username, useremail, userphone } 
    const username = document.querySelector("#username")
    const useremail = document.querySelector("#useremail")
    const userphone = document.querySelector("#userphone")
}