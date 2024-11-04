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
    addOns :[]
}

let userDetails = {
    username:'',
    email:'',
    phone:''
}

// current step tracking
// start at step 0 or localStorage value
// let currentStep = 0 
let currentStep = localStorage.getItem('currentStep') !== null 
    ? parseInt(localStorage.getItem('currentStep'))  
    : 0; 

updateButtons()

prevButtons.addEventListener('click', (event) => {
    event.preventDefault()
    moveToPreviousStep()
    //temp
    // loadFromLocalStorage()
})

nextButtons.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("Next button clicked"); 

    //validate the input on step0
    if(currentStep === 0 && !validateUserInput()) {
        console.log("Validation failed");
        return
    }

    // if any plan is selected or not
    if (currentStep === 1) {
        const selectedPlan = document.querySelector(".planCard.selected");
        if (!selectedPlan) {
            alert("Please select a plan before proceeding to the next step.");
            return
        }
    }

    if(currentStep === 2){
        updateOrderSummary();
    } 
    moveToNextStep();
    
    //temp
    // loadFromLocalStorage()
    // saveToLocalStorage()
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

    updateButtons() 
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

    // currentStep should not be greater than the no. of steps available
    if(currentStep < steps.length){
        steps[currentStep].classList.add('active')

        if(sidebarStepIcons[currentStep]){
            sidebarStepIcons[currentStep].classList.add("currStepActive")
        }
    }    
    updateButtons()
    saveToLocalStorage()
}


// toggle the buttons based on currentStep value
function updateButtons(){
    // console.log(`Inside updateButton function ... currentStep is${currentStep}`)
    if(currentStep === 0){
        prevButtons.classList.add("hideButton")
    } else{
        prevButtons.classList.remove("hideButton")
    }

    // if we are on the finishing up screen, change next step to confirm
    if(currentStep === 3){
        nextButtons.textContent = "Confirm"
        nextButtons.classList.add("confirm")
    } else{
        nextButtons.textContent = "Next Step"
        nextButtons.classList.remove("confirm")
    } 

    // hide the buttons on the last container i.e.Thankyou screen
    if(currentStep >= 4){
        // enable refresh
        // selectedPlanDetails.isComplete = true
        document.querySelector(".buttonContainer").style.display = "none"
        console.log("Reached thank you page");
        sidebarStepIcons[3].classList.add("currStepActive")
    } else{
        document.querySelector(".buttonContainer").style.display = "flex"
        // enable refresh
        // selectedPlanDetails.isComplete = false  
    } 

    // saveToLocalStorage()
}

function validateUserInput(){
    const username = document.getElementById("username").value.trim();
    const useremail = document.getElementById("useremail").value.trim();
    const userphone = document.getElementById("userphone").value.trim();

    let isValid = true;

    isValid = isValid & validateField(username, /^[a-zA-Z-_]+$/, "usernameErr", "username", "username")
    isValid = isValid & validateField(useremail, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "useremailErr", "useremail", "email")
    isValid =  isValid & validateField(userphone, /^\d{10}$/, "userphoneErr", "userphone", "phone")

    // store any changes
    saveToLocalStorage();
    return isValid
}

//validate helper function
function validateField(value, pattern, errorElementId, inputElementId, userDetailsKey) {
    const inputElement = document.getElementById(inputElementId)
    const errorElement = document.getElementById(errorElementId)
    
    if (!pattern.test(value)) {
        errorElement.style.display = "block"
        inputElement.style.border = "1px solid hsl(354, 84%, 57%)"
        return false
    } else {
        errorElement.style.display = "none"
        // reset border
        inputElement.style.border = "" 
        userDetails[userDetailsKey] = value
        return true
    }
}


// page 2 switcher to switch between monthly and yearly
const switcher = document.querySelector(".switch")
switcher.addEventListener("click", () => {   
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

  // save any changes
  saveToLocalStorage()

  // update the object on switch this is buggy. fix it
  updateObject(val)
})

function switchPrice(checked){
  addOffersInPlans(checked)
  const yearlyPrice = [90, 120, 150]
  const monthlyPrice = [9, 12, 15]
  const prices = document.querySelectorAll(".priceTag")

  // repetetive task. make a function if possible
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

  updateObject(checked)
  saveToLocalStorage()
}

// fix this function.
// update the addOns in object. change prices based on switcher
function updateObject(isYearly){
    const selectedPlan = document.querySelector(".planCard.selected")
    if (selectedPlan) {
        const planName = selectedPlan.querySelector(".planDetails p").textContent
        const planCost = selectedPlan.querySelector(".priceTag").textContent
        selectedPlanDetails.plan = planName
        selectedPlanDetails.planCost = planCost
    }

    // update add-ons prices based on selected duration
    selectedPlanDetails.addOns.forEach((addOn) => {
        addOn.price = isYearly ? `$${addOn.yearly}/yr` : `$${addOn.monthly}/mo`
    })
    //save the changes made to the selectedPlanDetails object 
    saveToLocalStorage()
}

// select the planCards i.e Arcade, Advanced and Pro
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

// add the 2 month free offer if toggle is in yearly,else remove the offer
function addOffersInPlans(checked){
    const planCardsDetails = document.querySelectorAll(".planDetails")

    if (checked) {
        planCardsDetails.forEach((plan) => {
            
            // check if the offer already exists
            if (!plan.querySelector(".offer")) {
                // create the offer paragraph
                const offer = document.createElement("p")
                offer.className = "offer"
                offer.textContent = "2 months free" 
                plan.appendChild(offer)
            }
        })
    } else {
        planCardsDetails.forEach((plan) => {
            const offer = plan.querySelector(".offer")
            if (offer) {
                offer.remove()
            }
        })
    }
}


const addOns = [
    { description: "Online service", monthly: 1, yearly: 10 },
    { description: "Larger storage", monthly: 2, yearly: 20 },
    { description: "Customizable profile", monthly: 2, yearly: 20 },
]
const inputCheckboxes = document.querySelectorAll(".box input")
// When adding selected add-ons
inputCheckboxes.forEach((inputCheckbox) => {
    inputCheckbox.addEventListener('click', function() {
        const currAddOn = inputCheckbox.parentElement
        const selectAddon = currAddOn.querySelector(".description label").textContent

        // search on the array defined above, not in the selectedPlanDetails object
        const addOn = addOns.find(addOn => addOn.description === selectAddon)

        if (inputCheckbox.checked) {
            currAddOn.classList.add("ad-selected")

            const price = selectedPlanDetails.duration === 'yearly' ? addOn.yearly : addOn.monthly
            const priceFormat = selectedPlanDetails.duration === 'yearly' ? `$${price}/yr` : `$${price}/mo`
            // add selected add-on with both prices
            selectedPlanDetails.addOns.push({
                description: selectAddon,
                price: priceFormat,
                monthly: addOn.monthly, 
                yearly: addOn.yearly,
            })
        } else {
            currAddOn.classList.remove("ad-selected")
            // remove the add-on
            selectedPlanDetails.addOns = selectedPlanDetails.addOns.filter(addOn => addOn.description !== selectAddon)
        } 
        saveToLocalStorage()

    })
})


// will extract the price from the screen
function getPrice(str){
    // let price = str.match(/(\d+)/)
    // return parseInt(price[0]) 

     // Check if str is valid (not null or undefined)
    if(str && typeof str === 'string') {
        let price = str.match(/(\d+)/)
        return price ? parseInt(price[0]) : null
    }
    // null if str not valid
    return null
}


// helper function that will remove the duplicates from the addons array
//to avoid duplicates when calculating totalprice
function removeDuplicateAddOns() {
    const uniqueAddOns = []
    const descriptions = new Set()

    selectedPlanDetails.addOns.forEach(addOn => {
        if (!descriptions.has(addOn.description)) {
            descriptions.add(addOn.description)
            uniqueAddOns.push(addOn)
        }
    })
    selectedPlanDetails.addOns = uniqueAddOns
}

// call this function
function updateOrderSummary(){
    
    // remove all duplicate addons before
    removeDuplicateAddOns()
    let totalPrice = 0

    let chosenPlanText = `${selectedPlanDetails.plan} (${selectedPlanDetails.duration})`
    document.querySelector(".chosenPlan").textContent = chosenPlanText

    document.querySelector(".planSummaryPrice").textContent = selectedPlanDetails.planCost
    totalPrice  += getPrice(selectedPlanDetails.planCost)
    //get addon 
    let addOnWrapper = document.querySelector(".addOnWrapper")  
    addOnWrapper.innerHTML = ""

    // create the addon html
    // iterate on the addOns in the object

    //remove the <hr>if no addons are present
    if(!selectedPlanDetails.addOns.length){
        console.log("this should HIDE the hr")
        document.querySelector("#hrOrderSummary").classList.add("hideHr")
    } else {
        console.log("hr should be VISIBLE");
        document.querySelector("#hrOrderSummary").classList.remove("hideHr")
    }

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

    // save changes
    saveToLocalStorage()
}

function saveToLocalStorage() {
    // store the plandetails, currentStep and userDetails in localStorage
    localStorage.setItem("selectedPlanDetails", JSON.stringify(selectedPlanDetails))
    localStorage.setItem("currentStep", currentStep) 
    localStorage.setItem("userDetails", JSON.stringify(userDetails))  
}       

function loadFromLocalStorage() {
    const savedPlanDetails = localStorage.getItem("selectedPlanDetails")
    if(savedPlanDetails){
        selectedPlanDetails = JSON.parse(savedPlanDetails)
    } 

    const savedCurrentStep = localStorage.getItem("currentStep")
    if (savedCurrentStep){
        currentStep = parseInt(savedCurrentStep)
    }

    const savedUserDetails = localStorage.getItem("userDetails")
    if(savedUserDetails){
        userDetails = JSON.parse(savedUserDetails)
    }

    showCurrentStep() 
    updateButtons() 
}

function showCurrentStep() {
    // hide all steps initially
    steps.forEach(step => step.classList.remove('active'));
    sidebarStepIcons.forEach(icon => icon.classList.remove("currStepActive"));

    // show the current step
    if (currentStep < steps.length) {
        steps[currentStep].classList.add('active');
        sidebarStepIcons[currentStep].classList.add("currStepActive");
        // log currentStep
        console.log(`Inside the showCurrentStep() ......`);
    
        // add switch case here
        if (currentStep === 0) {
            loadUserDetails()
        }
        else if (currentStep === 1) {
            loadSelectedPlan()
        }

        // Update the UI for step 3 (pick add-ons)
        else if (currentStep === 2) {
            updateAddOnsUI() // Call the new helper function
        }

        // bug fixed
        else if(currentStep === 3){
            updateOrderSummary()
        }

        // if(currentStep === 4){
        //     // sidebarStepIcons[currentStep-1].classList.add("currStepActive");
        //     redirectToFirstPage()
        // }
    }
}

// function to load the selected plan from selectedPlanDetails
function loadSelectedPlan() { 
    // console.log("called the loadSelectedP    lan function ...");
    const selectedPlan = selectedPlanDetails.plan
    const duration = selectedPlanDetails.duration
    const switcher = document.querySelector(".switch")
    // const val = switcher.querySelector("input").checked

    if(duration === "yearly"){
        switcher.querySelector("input").checked = true
        switchPrice(true) 
    } else{
        switcher.querySelector("input").checked = false
        switchPrice(false) 
    }

    // update the plan
    if (selectedPlan) {
        const planCards = document.querySelectorAll('.planCard')
        planCards.forEach(plan => {
            if (plan.querySelector(".planDetails p").textContent === selectedPlan) {
                plan.classList.add('selected')
            } else {
                plan.classList.remove('selected')
            }
        })
    }

    // update the plan prices
    // call the switch prices function. review this 
    saveToLocalStorage()
}


// function to display the selected addons when browser is refreshed
function updateAddOnsUI() {
    const duration = selectedPlanDetails.duration
    const addOns = selectedPlanDetails.addOns 
    const addOnCheckboxes = document.querySelectorAll('.box input')

    //update the price
    if(duration === "yearly"){
        switchPrice(true)
    } else {
        switchPrice(false)
    }

    addOnCheckboxes.forEach(checkbox => {
        // get the label for the addon
        const description = checkbox.nextElementSibling.querySelector('label').textContent
        const isChecked = addOns.some(addOn => addOn.description === description) 
        checkbox.checked = isChecked  
       
        // add or remove class from the parent .box div based on the checkbox state
        if(isChecked) {
            checkbox.parentElement.classList.add("ad-selected")
        } else {
            checkbox.parentElement.classList.remove("ad-selected")
        }
    })

    saveToLocalStorage()

}

// function to display user details when browser is refreshed
function loadUserDetails(){
    
    if(userDetails){
        console.log("from loadUserDetails: ",userDetails);
        document.getElementById('username').value = userDetails.username  // || ''
        document.getElementById('useremail').value = userDetails.email 
        document.getElementById('userphone').value = userDetails.phone 
    }

    // saveToLocalStorage()
} 

// the change link on click
const changeLink = document.querySelector("#changePlanLink")
changeLink.addEventListener('click', function(event){
    event.preventDefault()
    currentStep = 1
    saveToLocalStorage()
    showCurrentStep()
    updateButtons() 
})

document.addEventListener("DOMContentLoaded", loadFromLocalStorage())

