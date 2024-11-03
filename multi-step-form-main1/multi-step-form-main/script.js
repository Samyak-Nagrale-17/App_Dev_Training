// selecting all necessary elements
const regForm = document.querySelector("#multistepForm")
const steps = document.querySelectorAll(".step")
const sidebarStepIcons = document.querySelectorAll(".currStepIcon")
const prevButtons = document.querySelector("#prevButton")
const nextButtons = document.querySelector("#nextButton")


// object for finalPrice Calculation
let selectedPlanDetails = {
    plan:null,
    planCost: null,
    duration: "monthly", 
    addOns :[],
    switcherStatus: null    
}

// current step tracking
// start at step 0
let currentStep = 0
updateButtons()

prevButtons.addEventListener('click', (event) => {
    event.preventDefault()
    moveToPreviousStep()
})

nextButtons.addEventListener('click', (event) => {
    event.preventDefault()
    if(currentStep == 0 && !validateUserInput() ){
        console.log("clicked on next button")
        return
    } 

    // for order summary
    if(currentStep == 2){
        updateOrderSummary()
    }

    moveToNextStep()
})


// function to navigate to the previous step
function moveToPreviousStep() {
    updateButtons()

    // hide current step
    steps[currentStep].classList.remove('active')
    sidebarStepIcons[currentStep].classList.remove("currStepActive")

    // decrement step and show the previous step
    currentStep -= 1
    steps[currentStep].classList.add('active')
    sidebarStepIcons[currentStep].classList.add("currStepActive")

    saveToLocalStorage()
}
    
// function to navigate to the next step
function moveToNextStep() {  
    console.log(currentStep)
    updateButtons()
    // hide current step
    steps[currentStep].classList.remove('active')
    sidebarStepIcons[currentStep].classList.remove("currStepActive")

    // increment step and show the next step
    currentStep += 1

    if(currentStep < steps.length){
        steps[currentStep].classList.add('active')

        if(sidebarStepIcons[currentStep]){
            sidebarStepIcons[currentStep].classList.add("currStepActive")
        }
    }    

    saveToLocalStorage()
}


// toggle the buttons based on currentStep value
function updateButtons(){
    console.log(`Inside updateButton function ... currentStep is${currentStep}`)
    if(currentStep == 0){
        prevButtons.classList.add("hideButton")
    } else{
        // prevButtons.style.display = "block"
        prevButtons.classList.remove("hideButton")
    }

    if(currentStep == steps.length-1){
        nextButtons.style.display = "hidden"
    } else{
        nextButtons.style.display = "block"
    }

    // hide the button container on last page i.e. thank you page
    // if(currentStep > 2){  
    //     document.querySelector(".buttonContainer").style.display = "none"
    //     // sidebarStepIcons[2 ].classList.add("currStepActive")
    // }

    // hide the buttons on the last container
    if(currentStep >= 4){
        document.querySelector(".buttonContainer").style.display = "none"
        console.log("Reached thank you page");
        sidebarStepIcons[3].classList.add("currStepActive")
    } else{
        document.querySelector(".buttonContainer").style.display = "flex"
    }
}

function validateUserInput(){
    const username = document.getElementById("username").value.trim()
    const useremail = document.getElementById("useremail").value.trim()
    const userphone = document.getElementById("userphone").value.trim()

    let isValid = true

    // validate the username
    const usernamePattern = /^[a-zA-Z-_]/
    if(!usernamePattern.test(username)){
        document.getElementById("usernameErr").style.display = "block"
        document.getElementById("username").style.border = "1px solid hsl(354, 84%, 57%)"
        isValid = false 
    }
    else{
        document.getElementById("usernameErr").style.display = "none"
    }

    // validate the email
    const useremailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!useremailPattern.test(useremail)){
        document.getElementById("useremailErr").style.display = "block"
        document.getElementById("useremail").style.border = "1px solid hsl(354, 84%, 57%)"
        isValid = false
    }
    else{
        document.getElementById("useremailErr").style.display = "none"
    }

    //validate usernumber
    const userphonePattern = /^\d{10}$/
    if(!userphonePattern.test(userphone)){
        document.getElementById("userphoneErr").style.display = "block"
        document.getElementById("userphone").style.border = "1px solid hsl(354, 84%, 57%)"
        isValid = false
    }
    else{
        document.getElementById("userphoneErr").style.display = "none"
    }

    return isValid
}

// page 2 switcher
const switcher = document.querySelector(".switch")
switcher.addEventListener("click", () => {   // click to change
  const val = switcher.querySelector("input").checked
  if (val) {
    document.querySelector(".monthly").classList.remove("sw-active")
    document.querySelector(".yearly").classList.add("sw-active")
    selectedPlanDetails.duration = "yearly"
  } else {
    document.querySelector(".monthly").classList.add("sw-active")
    document.querySelector(".yearly").classList.remove("sw-active")
    selectedPlanDetails.duration = "monthly"
  }
  // change prices from monthly rates to yearly rates
  switchPrice(val)
  saveToLocalStorage()
  // update the object on switch
  // this is buggy. fix it
  updateObject(val); 
})

function switchPrice(checked){
  addOffersInPlans(checked)
  const yearlyPrice = [90, 120, 150]
  const monthlyPrice = [9, 12, 15]
  const prices = document.querySelectorAll(".priceTag")

  if (checked) {
    prices[0].innerHTML = `$${yearlyPrice[0]}/yr`
    prices[1].innerHTML = `$${yearlyPrice[1]}/yr`
    prices[2].innerHTML = `$${yearlyPrice[2]}/yr`
  } else {
    prices[0].innerHTML = `$${monthlyPrice[0]}/mo`
    prices[1].innerHTML = `$${monthlyPrice[1]}/mo`
    prices[2].innerHTML = `$${monthlyPrice[2]}/mo`
  }

  // do the same for addon prices
  const yearlyPriceAddon = [10,20]
  const monthlyPriceAddon = [1,2]
  const priceAddon = document.querySelectorAll(".priceAddon")
  if (checked){
    priceAddon[0].innerHTML = `$${yearlyPriceAddon[0]}/yr`
    priceAddon[1].innerHTML = `$${yearlyPriceAddon[1]}/yr`
    priceAddon[2].innerHTML = `$${yearlyPriceAddon[1]}/yr`
  }
  else{
    priceAddon[0].innerHTML = `$${monthlyPriceAddon[0]}/mo`
    priceAddon[1].innerHTML = `$${monthlyPriceAddon[1]}/mo`
    priceAddon[2].innerHTML = `$${monthlyPriceAddon[1]}/mo`
  }

  saveToLocalStorage()
}

// fix this function.
// returns NaN as updated price of addOns
// update the addOns in object. change prices based on switcher
function updateObject(checked){
    let addOns = selectedPlanDetails.addOns
    
    // do the same for addon prices
    const yearlyPriceAddon = [10,20]
    const monthlyPriceAddon = [1,2]
    if(checked){
        console.log(addOns) 
    } else{
        console.log(`inside udpateObject ... addOns not checked`)
    }


    saveToLocalStorage()

    // if(checked){
    //     // change the addon prices from month to year
    //     // addOn.price = `+$${addOn.price*10}/yr`
    //     for(let addOn of addOns){
    //         addOn.price = `+$${addOn.price*10}/yr`
    //     }
    // } else{
    //     // the prices must be in month
    //     for(let addOn of addOns){
    //         // addOn.price = `+$${Math.floor(getPrice(addOn.price)/10)}/mo`
    //     }
    // }
}


// select the plans
const plans = document.querySelectorAll(".planCard")
plans.forEach((plan) => {
    plan.addEventListener("click", () => {
    //   document.querySelector(".selected").classList.remove("selected");
    //   plan.classList.add("selected");
        const selectedPlan = document.querySelector(".planCard.selected")
        if (selectedPlan) {
            selectedPlan.classList.remove("selected")
        }
        // select the clicked plan
        plan.classList.add("selected")
        // get the selected plan
        const currSelectedPlan = plan.querySelector(".planDetails p").textContent
        const currSelectedPlanPrice = plan.querySelector(".planDetails .priceTag").textContent
        selectedPlanDetails.plan = currSelectedPlan  
        selectedPlanDetails.planCost = currSelectedPlanPrice

        saveToLocalStorage()
    })
})


// add the 2 month free offer if toggle is in yearly
function addOffersInPlans(checked){
    const planCardsDetails = document.querySelectorAll(".planDetails")
    if(checked){
        planCardsDetails.forEach((plan)=>{
            plan.querySelector(".offer").style.display = "block"
        })
    }
    else{
        planCardsDetails.forEach((plan)=>{
            plan.querySelector(".offer").style.display = "none"
        })
    }
}


// get the checkboxes inside the boxes
const inputCheckboxes = document.querySelectorAll(".box input")
// // add a event listener to all 3 checkbozes to change bg of selected plan
// inputCheckboxes.forEach((inputCheckbox) => {
//     inputCheckbox.addEventListener('click', function(){
//         const currAddOn = inputCheckbox.parentElement
//         if(inputCheckbox.checked){
//             // const currAddOn = inputCheckbox.parentElement
//             currAddOn.classList.toggle("ad-selected")
//             // inputCheckbox.parentElement.classList.toggle("ad-selected")

//             //add the selected addon to object
//             const selectAddon = currAddOn.querySelector(".description label").textContent
//             const selectAddonPrice = currAddOn.querySelector(".priceAddon").textContent

//             selectedPlanDetails.addOns.push({"description":selectAddon, "price":selectAddonPrice})

//         } else{
//             // remove the bg on unchecking the input checkbox
//             // inputCheckbox.parentElement.classList.toggle("ad-selected")
//             currAddOn.classList.toggle("ad-selected")
//             // selectedPlanDetails.addOns.push({"description":selectAddon, "price":selectAddonPrice})
//             selectedPlanDetails.addOns.pop()

//             // search for the currAddOn in the selectedPlanDetails.addOns and then delete that from the array of ojects
//             const selectAddon = currAddOn.querySelector(".description label").textContent
//             let tempAddOns = selectedPlanDetails.addOns.filter((addOn) => {
//                 return addOn.description != selectAddon
//             })

//             selectedPlanDetails.addOns = tempAddOns
//         }
//     })
// })

// when adding selected add ons
inputCheckboxes.forEach((inputCheckbox) => {
    inputCheckbox.addEventListener('click', function(){
        const currAddOn = inputCheckbox.parentElement
        const selectAddon = currAddOn.querySelector(".description label").textContent

        const addOn = addOns.find(addOn => addOn.description === selectAddon)

        if(inputCheckbox.checked){
            currAddOn.classList.toggle("ad-selected")

            selectedPlanDetails.addOns.push({
                description:selectAddon,
                price: `$${addOn.monthly}/mo`, // start with monthly prices
                monthly:addOn.monthly,
                yearly:addOn.yearly
            })
        } else{
            currAddOn.classList.toggle("ad-selected")
            // remove the addon
            selectedPlanDetails.addOns = selectedPlanDetails.addOns.filter(addOn => addOn.description !== selectAddon)
        }
        saveToLocalStorage()
    })
})


// will extract the price from the screen
function getPrice(str){
    let price = str.match(/(\d+)/)
    return parseInt(price[0])
}


// call this function
function updateOrderSummary(){
    // temp plan object
    // const selectedPlanDetails = {
    //     "plan": "Advanced",
    //     "planCost": "$120/yr",
    //     "duration": "yearly",
    //     "addOns": [
    //         {
    //             "description": "Online service",
    //             "price": "$10/yr"
    //         },
    //         {
    //             "description": "Larger storage",
    //             "price": "$20/yr"
    //         }
    //     ]
    // };

    let totalPrice = 0

    let chosenPlanText = `${selectedPlanDetails.plan} (${selectedPlanDetails.duration})`
    document.querySelector(".chosenPlan").textContent = chosenPlanText

    document.querySelector(".planSummaryPrice").textContent = selectedPlanDetails.planCost
    totalPrice  += getPrice(selectedPlanDetails.planCost)
    //get addon 
    let addOnWrapper = document.querySelector(".addOnWrapper")  
    console.log(addOnWrapper)
    addOnWrapper.innerHTML = ""
    console.log(addOnWrapper)

    // create the addon html
    // iterate on the addOns in the object
    for(let addOn of selectedPlanDetails.addOns){
        //create the addon
        let newAddOn = document.createElement("div")
        newAddOn.classList.add("addOn")

        let newAddOnText = document.createElement("div")
        newAddOnText.classList.add("addOntext")
        newAddOnText.textContent = addOn.description

        let newAddOnPrice = document.createElement("div")
        newAddOnPrice.classList.add("addOnPrice")
        newAddOnPrice.textContent = addOn.price
        totalPrice += getPrice(addOn.price)

        newAddOn.append(newAddOnText)
        newAddOn.append(newAddOnPrice)
        addOnWrapper.append(newAddOn)
    }    

    // calculate the final price
    if(selectedPlanDetails.duration == "monthly"){
        document.querySelector(".totalPrice").textContent = `$${totalPrice}/mo`
        document.querySelector(".orderText").textContent = `Total (per month)`
    }else {
        document.querySelector(".totalPrice").textContent = `$${totalPrice}/yr`
        document.querySelector(".orderText").textContent = `Total (per year)`
    }

    saveToLocalStorage()
}


function saveToLocalStorage() {
    
    localStorage.setItem("selectedPlanDetails", JSON.stringify(selectedPlanDetails))
    localStorage.setItem("currentStep", currentStep)
}

function loadFromLocalStorage() {
    const savedPlanDetails = localStorage.getItem("selectedPlanDetails")

    if(savedPlanDetails){
        selectedPlanDetails = JSON.parse(savedPlanDetails)
    }

    const savedCurrentStep = localStorage.getItem("currentStep")
    if (savedCurrentStep){
        currentStep = parseInt(savedCurrentStep,10)
    }
}

document.addEventListener("DOMContentLoaded", loadFromLocalStorage)
