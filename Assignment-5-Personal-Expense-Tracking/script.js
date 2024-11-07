const addExpenseButton = document.querySelector('#addExpenseButton')
const modalOverlay = document.querySelector('.modal-overlay')
const closeButtonModal = document.querySelector('#closeButtonModal')
const addExpenseButtonModal = document.querySelector('#addExpenseButtonModal')
const editExpenseButtonModal = document.querySelector('#editExpenseButtonModal')
const listDisplay = document.querySelector('.listDisplay')
const totalExpensesSum = document.querySelector('#totalExpensesSum')
const container = document.querySelector('.container')
const canvasWrapper = document.querySelector('.canvasWrapper')
const showExpenseListButton = document.querySelector('#showExpenseListButton')
const showSummaryButton = document.querySelector('#showSummaryButton')
const chartWrapperDiv = document.querySelector('.chartWrapper')
const expenseListWrapperDiv = document.querySelector('.expenseListWrapper')
// main expense list
let expenseList = []

// show the expenselist
showExpenseListButton.addEventListener('click', () => {
    expenseListWrapperDiv.classList.remove('hide')
    chartWrapperDiv.classList.add('hide')
})

// show summary
showSummaryButton.addEventListener('click', () => {
    expenseListWrapperDiv.classList.add('hide')
    chartWrapperDiv.classList.remove('hide')
})

// display the modal input onclick add expense button
addExpenseButton.addEventListener('click', () => {
    modalOverlay.classList.toggle("hide")
})

// close the modal input onclick cross icon
closeButtonModal.addEventListener('click', () => {
    modalOverlay.classList.toggle("hide")
    clearModal() 
    addExpenseButtonModal.classList.remove("hide")
    editExpenseButtonModal.classList.add("hide")
})


// will clear all modal fields
function clearModal(){
    document.querySelector('#expenseAmount').value = ""
    document.querySelector('#expenseDescription').value = ""
    document.querySelector('#expenseCategory').value = ""
    document.querySelector('#inputDate').value = ""
}

// update the total expense when listDisplay is updated
function calculateTotalExpenses(){
    // iterate over the expenseList
    let totalExpense = expenseList.reduce(
        (acc,curr) => acc + curr.expenseAmount,
        0,
    )
    // update the html
    totalExpensesSum.textContent = `$${totalExpense}` 
} 

function deleteSelectedExpenseDiv(Event){
    const eTarget = Event.target.closest("div.expenseDiv")
    const eTargetId = eTarget.getAttribute("dataExpenseId")

    // update the object
    expenseList = expenseList.filter((item) => item.expenseId !== parseInt(eTargetId))

    // save the changes
    saveToLocalStorage()
    calculateTotalExpenses()
    
    // render the chart
    updateChartData()
    //remove it
    eTarget.remove()
}

function editSelectedExpenseDiv(Event){
    // modalOverlay.classList.toggle("hide")

    const expenseDiv = Event.target.closest("div.expenseDiv")
    console.log(expenseDiv);
    
    const expenseDivId = expenseDiv.getAttribute("dataExpenseId")
    console.log(expenseDivId);
    

    // search for it in the object
    const expenseToEdit = expenseList.find(expense => expense.expenseId === parseInt(expenseDivId))
    console.log(expenseToEdit);
    
    // modalOverlay.classList.toggle("hide")
    // addExpenseButtonModal.classList.toggle("hide")
    // editExpenseButtonModal.classList.toggle("hide")

    //populate the modal
    if(expenseToEdit){
        document.querySelector('#expenseAmount').value = expenseToEdit.expenseAmount
        document.querySelector('#expenseDescription').value = expenseToEdit.expenseDescription
        document.querySelector('#expenseCategory').value = expenseToEdit.expenseCategory
        document.querySelector('#inputDate').value = expenseToEdit.expenseDate

        modalOverlay.classList.toggle("hide")
        addExpenseButtonModal.classList.add("hide")
        editExpenseButtonModal.classList.remove("hide")

        editExpenseButtonModal.onclick = function(){
            if(validateModalInput()){
                expenseToEdit.expenseAmount = parseFloat(document.querySelector('#expenseAmount').value)
                expenseToEdit.expenseDescription = document.querySelector('#expenseDescription').value
                expenseToEdit.expenseCategory = document.querySelector('#expenseCategory').value
                expenseToEdit.expenseDate = document.querySelector('#inputDate').value

                saveToLocalStorage()

                updateChartData()
                reloadExpenseList() 
                calculateTotalExpenses()
                clearModal()
                
                modalOverlay.classList.add("hide")
                addExpenseButtonModal.classList.remove("hide")
                editExpenseButtonModal.classList.add("hide")
            }
        }
    }
}

//update the expenseList
function updateExpenseList(newExpenseObject){

    //  create the same element
    let newExpenseDiv = document.createElement("div")

    newExpenseDiv.innerHTML = 

    `
    <div class="row1">
        <div class="expenseDivDate">${newExpenseObject.expenseDate}</div>
    </div>
    <div class="row2">
        <div class="expenseDivDescription">${newExpenseObject.expenseDescription}</div>
        <div class="expenseDivAmount">$${newExpenseObject.expenseAmount}</div>
        <div class="expenseDivCategory">${newExpenseObject.expenseCategory}</div>
        <button class="editExpenseDiv">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="deleteExpenseDiv">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>
    `
    newExpenseDiv.className = "expenseDiv"
    newExpenseDiv.setAttribute("dataExpenseId", newExpenseObject.expenseId)

    // for delete
    let deleteButton = newExpenseDiv.querySelector(".deleteExpenseDiv")
    deleteButton.addEventListener('click', deleteSelectedExpenseDiv)

    // for editing
    let editButton = newExpenseDiv.querySelector(".editExpenseDiv")
    editButton.addEventListener('click', editSelectedExpenseDiv)
    listDisplay.appendChild(newExpenseDiv)  
}


// validation of the input
function validateModalInput(){
    const expenseAmount = document.querySelector('#expenseAmount').value.trim()
    const expenseDescription = document.querySelector('#expenseDescription').value.trim()
    const expenseCategory = document.querySelector('#expenseCategory').value
    const expenseDate = document.querySelector('#inputDate').value

    let isValid = true

    if( isNaN(expenseAmount) || parseFloat(expenseAmount) <= 0){
        isValid = false
        console.log('expenseAmount validation failed');
        return
    } 
    
    // const descriptionRegex =  /^[a-zA-Z0-9\s]+$/
    // descriptionRegex.test(expenseDescription)
    if(expenseDescription === ""){
        isValid = false
        console.log('expenseDescription validation failed');
        return
    }

    // expenseCategory cant be empty. it has a default value
    if(!expenseCategory){
        isValid = false
        console.log('expenseCategory validation failed');
        return
    }
 
    // expenseDate needs to be validated
    if(!expenseDate){
        isValid = false
        console.log('date validation failed');
        return
    }

    // if(isValid){
    //     addNewExpense({expenseAmount,expenseDescription,expenseCategory,expenseDate})
    //     document.querySelector('#expenseAmount').value = ""
    //     document.querySelector('#expenseDescription').value = ""
    //     document.querySelector('#expenseCategory').value = ""
    //     // document.querySelector('#inputDate').value = ""
    // }
    // else{
    //     alert('Validation failed...')
    // }

    return isValid
}
 
// function to add a new expense
function addNewExpense({expenseAmount,expenseDescription,expenseCategory,expenseDate}){
    // get a unique expense id
    const currDate = new Date() 
    const newExpenseId = currDate.getTime() 

    let newExpenseObject = {
        'expenseId': newExpenseId,
        'expenseAmount': parseInt(expenseAmount),
        'expenseDescription': expenseDescription,
        'expenseCategory': expenseCategory,
        'expenseDate': expenseDate
    }

    // add the task to the mainArray
    expenseList.push(newExpenseObject)

    //update the expense list
    updateExpenseList(newExpenseObject)
    calculateTotalExpenses()

    // save in the localStorage
    saveToLocalStorage()
       // render the chart
       updateChartData() 
}

// save the expense but perform validation first
addExpenseButtonModal.addEventListener('click', () => {
    // validate the input
    if(validateModalInput()){
        const expenseAmount = document.querySelector('#expenseAmount').value.trim()
        const expenseDescription = document.querySelector('#expenseDescription').value.trim()
        const expenseCategory = document.querySelector('#expenseCategory').value
        const expenseDate = document.querySelector('#inputDate').value
        addNewExpense({expenseAmount,expenseDescription,expenseCategory,expenseDate})

        document.querySelector('#expenseAmount').value = ""
        document.querySelector('#expenseDescription').value = ""
        document.querySelector('#expenseCategory').value = ""
        document.querySelector('#inputDate').value = ""
    }
    else{
        alert('validation failed...')
    }

    //addNewExpense()
    // clear the all input fields. create a function for this purpose
})

// save the expense list in localStorage
function saveToLocalStorage(){
    localStorage.setItem("expenseList", JSON.stringify(expenseList))
}

function reloadExpenseList(){
    // call the update
    listDisplay.innerHTML = ""
    
    expenseList.forEach((item) => {
        updateExpenseList(item)
    })
}

// load the data from the localStorage
function loadFromLocalStorage(){ 
    let savedExpenseList = JSON.parse(localStorage.getItem("expenseList"))
    if(savedExpenseList){
        expenseList = savedExpenseList
    }
    reloadExpenseList()
    calculateTotalExpenses()
    updateChartData()
}

// load the expenseList on refresh
document.addEventListener("DOMContentLoaded", loadFromLocalStorage)

// chart
// Initialize the chart
const ctx = document.getElementById('myChart')
let myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Food', 'Fuel', 'Utility', 'Clothing', 'Medical'], 
        datasets: [{
            // 0 at start, updates on adding 
            data:[0,0,0,0,0],
        }] 
    }
})

function updateChartData(){
    // let processedData = {}

    // expenseList.forEach((expense) => {
    //     if(processedData[expense.expenseCategory]){
    //         processedData[expense.expenseCategory] += expense.expenseAmount
    //     } else {
    //         processedData[expense.expenseCategory] = expense.expenseAmount
    //     }
    // })
    // return processedData

    // //array to hold the total expenses for each category
    let categoryTotals = {
        'Food': 0,
        'Fuel': 0,
        'Utility': 0,
        'Clothing': 0,
        'Medical': 0
    }

    expenseList.forEach(expense => {
        categoryTotals[expense.expenseCategory] += expense.expenseAmount
    })

    console.log(expenseList)
    console.log(categoryTotals);
    myChart.data.datasets[0].data = [
        categoryTotals.Food,
        categoryTotals.Fuel,
        categoryTotals.Utility,
        categoryTotals.Clothing,
        categoryTotals.Medical
    ]

    // hide if no expenseDivs
    if(!expenseList.length){
        canvasWrapper.classList.add("hide")
    } else{
        canvasWrapper.classList.remove("hide")
        myChart.update()
    }
    // myChart.update()
}
