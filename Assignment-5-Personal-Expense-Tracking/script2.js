const addExpenseButton = document.querySelector('#addExpenseButton')
const modalOverlay = document.querySelector('.modal-overlay')
const closeButtonModal = document.querySelector('#closeButtonModal')
const addExpenseButtonModal = document.querySelector('#addExpenseButtonModal')
const editExpenseButtonModal = document.querySelector('#editExpenseButtonModal')
const listDisplay = document.querySelector('.listDisplay')
const totalExpensesSum = document.querySelector('#totalExpensesSum')
const container = document.querySelector('.container')
// main expense list
let expenseList = []

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


// will display and update the graph


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
                   // render the chart
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
const ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'doughnut', // Define chart type
    data: {
        labels: ['Food', 'Fuel', 'Utility', 'Transportation', 'Miscellaneous'], // Categories for the doughnut chart
        datasets: [{
            // label: ['Food', 'Fuel', 'Utility', 'Transportation', 'Misc'],
            data: [0, 0, 0, 0, 0], // Initial data (will be updated)
            // data:Object.values(tempData2),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', // Food
                'rgba(54, 162, 235, 0.2)', // Fuel
                'rgba(255, 206, 86, 0.2)', // Utility
                'rgba(75, 192, 192, 0.2)', // Transportation
                'rgba(153, 102, 255, 0.2)'  // Miscellaneous
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    // options: {
    //     responsive: true,
    //     plugins: {
    //         legend: {
    //             position: 'top',
    //         },
    //         tooltip: {
    //             callbacks: {
    //                 label: function(tooltipItem) {
    //                     return tooltipItem.label + ': $' + tooltipItem.raw.toFixed(2);
    //                 }
    //             }
    //         }
    //     }
    // }
});


function updateChartData(){
     // Initialize an array to hold the total expenses for each category
     const categoryTotals = {
        'Food': 0,
        'Fuel': 0,
        'Utility': 0,
        'Transportation': 0,
        'Miscellaneous': 0
    };

    // Loop through expenseList and add up the amounts for each category
    expenseList.forEach(expense => {
        categoryTotals[expense.expenseCategory] += parseFloat(expense.expenseAmount);
    });

    // Update the chart data
    myChart.data.datasets[0].data = [
        categoryTotals.Food,
        categoryTotals.Fuel,
        categoryTotals.Utility,
        categoryTotals.Transportation,
        categoryTotals.Miscellaneous
    ];

    // Re-render the chart to reflect the updated data
    myChart.update(); 

}

// let tempData2 = updateChartData()