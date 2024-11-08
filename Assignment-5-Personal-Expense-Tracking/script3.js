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
const sortAscendingButton = document.querySelector('#sortAscending')
const sortDescendingButton = document.querySelector('#sortDescending')

// main expense list
let expenseList = []
let currentSort = null

//sort by amount ascending
sortAscendingButton.addEventListener('click', () => {
    // sortExpenseAscending()
    // sortAscendingButton.classList.toggle('buttonSelected')
    if (currentSort === 'ascending') {
        resetSort()
    } else {
        sortExpenseAscending()
        currentSort = 'ascending'
        updateButtonStyles()
    }
})

// sort by amount descending
sortDescendingButton.addEventListener('click', () => {
    // sortExpenseDescending()
    // sortDescendingButton.classList.toggle('buttonSelected')
    if (currentSort === 'descending') {
        resetSort()
    } else {
        sortExpenseDescending()
        currentSort = 'descending'
        updateButtonStyles() 
    }
})

function updateButtonStyles() {
    sortAscendingButton.classList.toggle('buttonSelected', currentSort === 'ascending')
    sortDescendingButton.classList.toggle('buttonSelected', currentSort === 'descending')
}

function resetSort() {
    currentSort = null
    reloadExpenseList()
    localStorage.removeItem('sortState')
    updateButtonStyles()
}

function sortExpenseAscending(){
    // make a copy of expenselist
    let tempExpenseList = [...expenseList]
    // sort it
    tempExpenseList = tempExpenseList.sort(
        (p1,p2) => (p1.expenseAmount < p2.expenseAmount) ? 1 : (p1.expenseAmount > p2.expenseAmount) ? -1:0)
    
    // add a default parameter to reloadExpenseList
    tempReloadExpenseList(tempExpenseList)
    currentSort = 'ascending'
    localStorage.setItem('sortState', currentSort) 
    updateButtonStyles()
}

function sortExpenseDescending(){
    // make a copy of expenselist
    let tempExpenseList = [...expenseList]
    // sort it

    tempExpenseList = tempExpenseList.sort(
        (p1,p2) => (p1.expenseAmount > p2.expenseAmount) ? 1 : (p1.expenseAmount < p2.expenseAmount) ? -1:0)

    // add a default parameter to reloadExpenseList
    tempReloadExpenseList(tempExpenseList)
    currentSort = 'descending'
    localStorage.setItem('sortState', currentSort)  
    updateButtonStyles()
}


function tempReloadExpenseList(list = temp){
    listDisplay.innerHTML = ""
    // Use the specified list (sorted list or original list)
    list.forEach((item) => {
        updateExpenseList(item)
    })
}

// show the expenselist
showExpenseListButton.addEventListener('click', () => {
    expenseListWrapperDiv.classList.remove('hide')
    chartWrapperDiv.classList.add('hide')
    localStorage.setItem('activeSection', 'expenseList')
})


// show summary
showSummaryButton.addEventListener('click', () => {
    expenseListWrapperDiv.classList.add('hide')
    chartWrapperDiv.classList.remove('hide')
    localStorage.setItem('activeSection', 'summary')
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
    // document.querySelector('#inputDate').value = ""
    document.querySelector('#inputDate').value = new Date().toISOString().split("T")[0]

    // clear the errors too
    const amountErr = document.querySelector('#amountErr')
    const descriptionErr = document.querySelector('#descriptionErr')
    const dateErr = document.querySelector('#dateErr')
    const categoryErr = document.querySelector('#categoryErr')
    amountErr.classList.add('hide')
    descriptionErr.classList.add('hide')
    dateErr.classList.add('hide')
    categoryErr.classList.add('hide')
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
    updateChartData2()
    //remove it
    eTarget.remove()
}

function editSelectedExpenseDiv(Event){
    // modalOverlay.classList.toggle("hide")

    const expenseDiv = Event.target.closest("div.expenseDiv")
    console.log(expenseDiv)
    
    const expenseDivId = expenseDiv.getAttribute("dataExpenseId")
    console.log(expenseDivId)

    // search for it in the object
    const expenseToEdit = expenseList.find(expense => expense.expenseId === parseInt(expenseDivId))
    console.log(expenseToEdit)
    
    //populate the modal
    if(expenseToEdit){
        document.querySelector('#expenseAmount').value = expenseToEdit.expenseAmount
        document.querySelector('#expenseDescription').value = expenseToEdit.expenseDescription
        document.querySelector('#expenseCategory').value = expenseToEdit.expenseCategory
        // document.querySelector('#inputDate').value = expenseToEdit.expenseDate
        const [day, month, year] = expenseToEdit.expenseDate.split('-')
        document.querySelector('#inputDate').value = `${year}-${month}-${day}` 

        modalOverlay.classList.toggle("hide")
        addExpenseButtonModal.classList.add("hide")
        editExpenseButtonModal.classList.remove("hide")

        editExpenseButtonModal.onclick = function(){
            if(validateModalInput()){
                expenseToEdit.expenseAmount = parseFloat(document.querySelector('#expenseAmount').value)
                expenseToEdit.expenseDescription = document.querySelector('#expenseDescription').value
                expenseToEdit.expenseCategory = document.querySelector('#expenseCategory').value
                // expenseToEdit.expenseDate = document.querySelector('#inputDate').value
                const inputDate = document.querySelector('#inputDate').value.split('-')
                expenseToEdit.expenseDate = `${inputDate[2]}-${inputDate[1]}-${inputDate[0]}`

                saveToLocalStorage()
                updateChartData()
                updateChartData2()
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
    <div class="expenseDivDescription">${newExpenseObject.expenseDescription}</div>
    <div class="expenseDivAmount">$${newExpenseObject.expenseAmount}</div>
    <div class="expenseDivCategory">${newExpenseObject.expenseCategory}</div>
    <div class="expenseDivDate">${newExpenseObject.expenseDate}</div>

    <div class="buttonWrapper">
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
    const expenseCategory = document.querySelector('#expenseCategory').value.trim()
    const expenseDate = document.querySelector('#inputDate').value.trim()

    const amountErr = document.querySelector('#amountErr')
    const descriptionErr = document.querySelector('#descriptionErr')
    const dateErr = document.querySelector('#dateErr')
    const categoryErr = document.querySelector('#categoryErr')
    let isValid = true

    amountErr.classList.add('hide')
    descriptionErr.classList.add('hide')
    dateErr.classList.add('hide')
    categoryErr.classList.add('hide')

    if (!expenseAmount) {
        isValid = false
        amountErr.textContent = 'Required.'
        amountErr.classList.remove('hide')

    } else if (isNaN(expenseAmount) || parseFloat(expenseAmount) <= 0) {
        isValid = false
        amountErr.textContent = 'Must be greater than 0.'
        amountErr.classList.remove('hide')
    } else{
        amountErr.classList.add('hide')
    }
    
    const descriptionRegex = /^[a-zA-Z0-9$\s]+$/
    if (!expenseDescription) {
        isValid = false
        descriptionErr.textContent = 'Required.'
        descriptionErr.classList.remove('hide')

    } else if (!descriptionRegex.test(expenseDescription)) {
        isValid = false
        descriptionErr.textContent = 'Invalid description.'
        descriptionErr.classList.remove('hide')
    } else{
        descriptionErr.classList.add('hide')
    }

    if (!expenseCategory) {
        isValid = false
        categoryErr.textContent = 'Required'
        categoryErr.classList.remove('hide')
    } else{
        categoryErr.classList.add('hide')
    }
 
    // expenseDate needs to be validated
    if (!expenseDate) {
        isValid = false;
        dateErr.textContent = 'Required.'
        dateErr.classList.remove('hide')
    } else{
        dateErr.classList.add('hide')
    }

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
    clearModal()
    saveToLocalStorage()
    // render the chart
    updateChartData() 
    updateChartData2()
}

// save the expense but perform validation first
addExpenseButtonModal.addEventListener('click', () => {
    // validate the input
    if(validateModalInput()){
        const expenseAmount = document.querySelector('#expenseAmount').value.trim()
        const expenseDescription = document.querySelector('#expenseDescription').value.trim()
        const expenseCategory = document.querySelector('#expenseCategory').value
        const expenseDate = document.querySelector('#inputDate').value.split('-').reverse().join('-');
        addNewExpense({expenseAmount,expenseDescription,expenseCategory,expenseDate})

        document.querySelector('#expenseAmount').value = ""
        document.querySelector('#expenseDescription').value = ""
        document.querySelector('#expenseCategory').value = ""
        document.querySelector('#inputDate').value = ""
        console.log('end of modal');
        
        // clearModal()
    }
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

    const activeSection = localStorage.getItem("activeSection");

    if (activeSection === "summary") {
        expenseListWrapperDiv.classList.add("hide")
        chartWrapperDiv.classList.remove("hide")
    } else {
        expenseListWrapperDiv.classList.remove("hide")
        chartWrapperDiv.classList.add("hide")
    }

    // load and apply saved sorting state
    const savedSortState = localStorage.getItem("sortState")
    if (savedSortState === "ascending") {
        sortExpenseAscending()
    } else if (savedSortState === "descending") {
        sortExpenseDescending()
    } else {
        reloadExpenseList()
    }
    // reloadExpenseList()
    calculateTotalExpenses()
    updateChartData()
    updateChartData2()
}

// load the expenseList on refresh
document.addEventListener("DOMContentLoaded", loadFromLocalStorage)

// chart1: doughnut chart
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
    },
    options:{
        plugins:{
            // title:{
            //     display: true,
            //     text: 'Total expenses by category'
            // }
        }
    }
})


const ctx2 = document.getElementById('myChart2');
let myChart23 = new Chart(ctx2, {
    type: 'line', 
    data: {
        labels: [], 
        datasets: [{
            label: 'Total Expenses', 
            // placeholder for total expenses for each month
            data: [], 
            borderColor: 'rgba(75, 192, 192, 1)', 
            backgroundColor: 'rgba(75, 192, 192, 0.2)', 
            fill: true, 
            tension: 0.1 
        }]
    },
    options: {
        plugins: {
            // title: {
            //     display: true,
            //     text: 'Monthly Total Expenses'
            // }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Expense Amount'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            }
        }
    }
});


function updateChartData(){
    //object to hold the total expenses for each category
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
}

function updateChartData2() {
    let totalMonthlyExpenses = []
    let months = []

    expenseList.forEach(expense => {
        let dateParts = expense.expenseDate.split('-')
        let month = dateParts[1]
        let year = dateParts[2]
        let monthYear = `${month}-${year}`

        if (!months.includes(monthYear)) {
            months.push(monthYear)
            totalMonthlyExpenses.push(0)
        }

        let monthIndex = months.indexOf(monthYear)
        totalMonthlyExpenses[monthIndex] += expense.expenseAmount
    })

    let sortedMonths = months.map(month => {
        let [monthNumber, year] = month.split('-')
        return { monthNumber: parseInt(monthNumber), year: parseInt(year), month }
    })
    .sort((a, b) => {
        return a.year === b.year ? a.monthNumber - b.monthNumber : a.year - b.year
    })
    .map(item => item.month)

    let sortedTotalExpenses = sortedMonths.map(sortedMonth => {
        let monthIndex = months.indexOf(sortedMonth)
        return totalMonthlyExpenses[monthIndex]
    })

    myChart23.data.labels = sortedMonths
    myChart23.data.datasets[0].data = sortedTotalExpenses

    // If no expenses, hide the chart
    if (!expenseList.length) {
        canvasWrapper.classList.add('hide')
    } else {
        canvasWrapper.classList.remove('hide')
        myChart23.update()
    }
}
