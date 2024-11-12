
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
    : 0

updateButtons()

prevButtons.addEventListener('click', (event) => {
    event.preventDefault()
    moveToPreviousStep()

    // load the changes
    loadFromLocalStorage()
})

nextButtons.addEventListener('click', (event) => {
    event.preventDefault()
    //validate the input on step0
    if(currentStep === 0 && !validateUserInput()) {
        console.log("Validation failed")
        return
    }

    // if any plan is selected or not
    if (currentStep === 1) {
        const selectedPlan = document.querySelector(".planCard.selected")
        if (!selectedPlan) {
            alert("Please select a plan before proceeding to the next step.")
            return
        }
    }

    if(currentStep === 2){
        updateOrderSummary()
    } 
    moveToNextStep()
    
    // load the changes
    loadFromLocalStorage()
    saveToLocalStorage()
}) 


// function to navigate to the previous step
function moveToPreviousStep() {

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
    
    if(currentStep === 0){
        prevButtons.classList.add("hideButton")
    } else{
        prevButtons.classList.remove("hideButton")
    }

    if(currentStep === 3){
        nextButtons.textContent = "Confirm"
        nextButtons.classList.add("confirm")

    } else{
        nextButtons.textContent = "Next Step"
        nextButtons.classList.remove("confirm")
    } 

    // hide the buttons on the last container i.e.Thankyou screen
    if(currentStep >= 4){
        document.querySelector(".buttonContainer").style.display = "none"
    } else{
        document.querySelector(".buttonContainer").style.display = "flex" 
    } 
    // saveToLocalStorage()
}

function validateUserInput(){    
    const username = document.getElementById("username").value.trim()
    const useremail = document.getElementById("useremail").value.trim()
    const userphone = document.getElementById("userphone").value.trim()

    let isValid = true

    isValid = isValid & validateField(username, /^[a-zA-Z ]+$/, "usernameErr", "username", "username","Invalid name")
    isValid = isValid & validateField(useremail, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "useremailErr", "useremail", "email", "Invalid email address")
    isValid =  isValid & validateField(userphone, /^(?:\+?\d{1,3}[- ]?)?\d{10}$/, "userphoneErr", "userphone", "phone", "Invalid phone number")
    // store any changes
    saveToLocalStorage()
    return isValid
}

//validate helper function
function validateField(value, pattern, errorElementId, inputElementId, userDetailsKey, invalidMessage) {    
    const inputElement = document.getElementById(inputElementId)
    const errorElement = document.getElementById(errorElementId)

    if (value === "") {
        // field is empty
        errorElement.style.display = "block"
        errorElement.textContent = "This field is required"
        inputElement.style.border = "1px solid hsl(354, 84%, 57%)"
        return false
    } else if (!pattern.test(value)) {
        // field is not empty but invalid
        errorElement.style.display = "block"
        errorElement.textContent = invalidMessage
        inputElement.style.border = "1px solid hsl(354, 84%, 57%)"
        return false
    } else {
        // field is valid
        errorElement.style.display = "none"
        errorElement.textContent = ""  
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

  // update the object on switch
  updateObject(val)
})


function switchPrice(checked){
    addOffersInPlans(checked)
      
    // define plan prices
    const planPrices = {
      yearly: [90, 120, 150],
      monthly: [9, 12, 15]
    }
    
    // define addon prices. use the addOn array
    const addOnPrices = {
      yearly: addOns.map(addOn => addOn.yearly),
      monthly: addOns.map(addOn => addOn.monthly)
    }
    
    // update plan prices
    const prices = document.querySelectorAll(".priceTag")
    prices.forEach((priceTag, index) => {

      priceTag.innerHTML = `$${checked ? planPrices.yearly[index] : planPrices.monthly[index]}/${checked ? 'yr' : 'mo'}`
    })
    
    // update add-on prices
    const priceAddon = document.querySelectorAll(".priceAddon")
    priceAddon.forEach((addonTag, index) => {
      addonTag.innerHTML = `+$${checked ? addOnPrices.yearly[index] : addOnPrices.monthly[index]}/${checked ? 'yr' : 'mo'}`
    })
    
    updateObject(checked)
    saveToLocalStorage()
}


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

// has all info of the 3 addons. used to switch prices and help 
// to calculate the total price
const addOns = [
    { description: "Online service", monthly: 1, yearly: 10 },
    { description: "Larger storage", monthly: 2, yearly: 20 },
    { description: "Customizable profile", monthly: 2, yearly: 20 },
]


//event listener on the addon box itself
const boxDivs = document.querySelectorAll(".box")

boxDivs.forEach((box) => {
    box.addEventListener('click', function() {
        const inputCheckbox = box.querySelector("input[type='checkbox']")
        //toggle the checkbox state onclick
        const isChecked = !inputCheckbox.checked
        inputCheckbox.checked = isChecked

        const selectAddon = box.querySelector(".description label").textContent

        // find add-on in the main addOns array
        const addOn = addOns.find(addOn => addOn.description === selectAddon)

        if (isChecked) {
            box.classList.add("ad-selected")

            // get the appropriate price based on selected plan duration
            const price = selectedPlanDetails.duration === 'yearly' ? addOn.yearly : addOn.monthly
            const priceFormat = selectedPlanDetails.duration === 'yearly' ? `$${price}/yr` : `$${price}/mo`

            // add selected add-on details to selectedPlanDetails.addOns
            selectedPlanDetails.addOns.push({
                description: selectAddon,
                price: priceFormat,
                monthly: addOn.monthly,
                yearly: addOn.yearly,
            })
        } else {
            box.classList.remove("ad-selected")

            // remove the add-on from selectedPlanDetails.addOns
            selectedPlanDetails.addOns = selectedPlanDetails.addOns.filter(addOn => addOn.description !== selectAddon)
        }   
        // save the updated state to localStorage
        saveToLocalStorage()
    })
})


function updateOrderSummary(){
    removeDuplicateAddOns()
    let totalPrice = 0

    let chosenPlanText = `${selectedPlanDetails.plan} (${selectedPlanDetails.duration})`
    document.querySelector(".chosenPlan").textContent = chosenPlanText

    document.querySelector(".planSummaryPrice").textContent = selectedPlanDetails.planCost
    totalPrice += getPrice(selectedPlanDetails.planCost)

    let addOnWrapper = document.querySelector(".addOnWrapper")
    addOnWrapper.innerHTML = ""

    if (!selectedPlanDetails.addOns.length) {
        document.querySelector("#hrOrderSummary").classList.add("hideHr")
    } else {
        document.querySelector("#hrOrderSummary").classList.remove("hideHr")
    }

    for (let addOn of selectedPlanDetails.addOns) {
        // find the corresponding addOn object in the addOns array
        const addOnDetails = addOns.find(a => a.description === addOn.description)

        if (addOnDetails) {
            let addOnPrice = selectedPlanDetails.duration === "monthly" 
                ? addOnDetails.monthly 
                : addOnDetails.yearly

            // create the add-on elementto add to html
            let newAddOn = document.createElement("div")
            newAddOn.classList.add("addOn")

            let newAddOnText = document.createElement("div")
            newAddOnText.classList.add("addOntext")
            newAddOnText.textContent = addOn.description

            let newAddOnPrice = document.createElement("div")
            newAddOnPrice.classList.add("addOnPrice")
            newAddOnPrice.textContent = `+$${addOnPrice}/${selectedPlanDetails.duration === "monthly" ? "mo" : "yr"}`
            totalPrice += addOnPrice

            newAddOn.append(newAddOnText)
            newAddOn.append(newAddOnPrice)
            addOnWrapper.append(newAddOn)
        }
    }

    // calculate the final price
    if (selectedPlanDetails.duration === "monthly") {
        document.querySelector(".totalPrice").textContent = `+$${totalPrice}/mo`
        document.querySelector(".orderText").textContent = `Total (per month)`
    } else {
        document.querySelector(".totalPrice").textContent = `+$${totalPrice}/yr`
        document.querySelector(".orderText").textContent = `Total (per year)`
    }

    // Save changes
    saveToLocalStorage()
}

// will extract the price from the screen
function getPrice(str){

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
    // updateButtons() 
}


function showCurrentStep() {
    
    // hide all steps initially
    document.querySelectorAll('.step').forEach(step => {
        step.style.display = 'none'
    })


    // display the current step
    const currentStepElement = document.querySelector(`.step[data-step="${currentStep}"]`)
    if (currentStepElement) {
        currentStepElement.style.display = 'block'
    }

    sidebarStepIcons.forEach((icon,index) => {
        icon.classList.toggle('currStepActive', index === currentStep)
    })

    // call specific functions based on currentStep
    switch (currentStep) {
        case 0:
            loadUserDetails()
            break
        case 1:
            loadSelectedPlan() 
            break
        case 2:
            updateAddOnsUI()
            break
        case 3:
            updateOrderSummary()
            break
        case 4:
            const defaultSelectedPlanDetails = {
                plan: null,
                planCost: null,
                duration: "monthly",
                addOns: []
            }

            const defaultUserDetails = {
                username: '',
                email: '',
                phone: ''
            }

            localStorage.setItem('selectedPlanDetails', JSON.stringify(defaultSelectedPlanDetails))
            localStorage.setItem('userDetails', JSON.stringify(defaultUserDetails))
            localStorage.setItem('currentStep', 0)


            // saveToLocalStorage() 
            if(localStorage.getItem("currentStep") == 0){
                showCurrentStep()
                //return
            }
            // break
            return
    }

    updateButtons() 
    // saveToLocalStorage()  
}

// functions on refresh
// function to load the selected plan from selectedPlanDetails
function loadSelectedPlan() { 
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

    saveToLocalStorage()
}

// function to display the selected addons when the browser is refreshed
function updateAddOnsUI() {
    const duration = selectedPlanDetails.duration;
    const addOns = selectedPlanDetails.addOns;
    const addOnCheckboxes = document.querySelectorAll('.box input');

    if (duration === "yearly") {
        switchPrice(true);
    } else {
        switchPrice(false);
    }
    addOnCheckboxes.forEach(checkbox => {

        const descriptionElement = checkbox.closest('.box').querySelector('.description label');
        if (descriptionElement) {
            const description = descriptionElement.textContent;
            const isChecked = addOns.some(addOn => addOn.description === description);
            checkbox.checked = isChecked;



            if (isChecked) {
                checkbox.parentElement.classList.add("ad-selected");
            } else {
                checkbox.parentElement.classList.remove("ad-selected");
            }
        } else {
            console.warn("No description label found for checkbox:", checkbox);
        }
    });
    saveToLocalStorage();
}

// function to display user details when browser is refreshed
function loadUserDetails(){
    if(userDetails){
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

// document.addEventListener("DOMContentLoaded", loadFromLocalStorage())
document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage()
    // showCurrentStep() 
})
