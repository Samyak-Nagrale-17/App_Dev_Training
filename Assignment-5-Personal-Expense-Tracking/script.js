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

//sort by amount ascending
sortAscendingButton.addEventListener('click', sortExpenseAscending)

// sort by amount descending
sortDescendingButton.addEventListener('click', sortExpenseDescending)


function sortExpenseAscending(){
    // make a copy of expenselist
    let tempExpenseList = expenseList
    // sort it

    tempExpenseList = tempExpenseList.sort(
        (p1,p2) => (p1.expenseAmount < p2.expenseAmount) ? 1 : (p1.expenseAmount > p2.expenseAmount) ? -1:0)
    
    // updateExpense list for all
    tempExpenseList.forEach((item) => {
        reloadExpenseList(item)
    })
}

function sortExpenseDescending(){
    // make a copy of expenselist
    let tempExpenseList = expenseList
    // sort it

    tempExpenseList = tempExpenseList.sort(
        (p1,p2) => (p1.expenseAmount > p2.expenseAmount) ? 1 : (p1.expenseAmount < p2.expenseAmount) ? -1:0)

    // updateExpense list for all
    tempExpenseList.forEach((item) => {
        reloadExpenseList(item)
    })
}

// show the expenselist
showExpenseListButton.addEventListener('click', () => {
    expenseListWrapperDiv.classList.remove('hide')
    chartWrapperDiv.classList.add('hide')
    localStorage.setItem('activeSection', 'expenseList'); // Save state
})

// show summary
showSummaryButton.addEventListener('click', () => {
    expenseListWrapperDiv.classList.add('hide')
    chartWrapperDiv.classList.remove('hide')
    localStorage.setItem('activeSection', 'summary'); // Save state
})

// display the modal input onclick add expense button
addExpenseButton.addEventListener('click', () => {
    modalOverlay.classList.toggle("hide")
    // setDefaultDate() 
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
    updateChartData2()
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
        // document.querySelector('#inputDate').value = expenseToEdit.expenseDate
        const [day, month, year] = expenseToEdit.expenseDate.split('-');
        document.querySelector('#inputDate').value = `${year}-${month}-${day}`; 

        modalOverlay.classList.toggle("hide")
        addExpenseButtonModal.classList.add("hide")
        editExpenseButtonModal.classList.remove("hide")

        editExpenseButtonModal.onclick = function(){
            if(validateModalInput()){
                expenseToEdit.expenseAmount = parseFloat(document.querySelector('#expenseAmount').value)
                expenseToEdit.expenseDescription = document.querySelector('#expenseDescription').value
                expenseToEdit.expenseCategory = document.querySelector('#expenseCategory').value
                // expenseToEdit.expenseDate = document.querySelector('#inputDate').value
                const inputDate = document.querySelector('#inputDate').value.split('-');
                expenseToEdit.expenseDate = `${inputDate[2]}-${inputDate[1]}-${inputDate[0]}`;

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

    // newExpenseDiv.innerHTML = 

    // `
    // <div class="row1">
    //     <div class="expenseDivDate">${newExpenseObject.expenseDate}</div>
    // </div>
    // <div class="row2">
    //     <div class="expenseDivDescription">${newExpenseObject.expenseDescription}</div>
    //     <div class="expenseDivAmount">$${newExpenseObject.expenseAmount}</div>
    //     <div class="expenseDivCategory">${newExpenseObject.expenseCategory}</div>
    //     <button class="editExpenseDiv">
    //         <i class="fa-solid fa-pen-to-square"></i>
    //     </button>
    //     <button class="deleteExpenseDiv">
    //         <i class="fa-solid fa-trash"></i>
    //     </button>
    // </div>
    // `

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


// function setDefaultDate() {
//     const dateInput = document.querySelector('#inputDate');
//     const today = new Date();

//     // Extract day, month, and year components
//     const day = String(today.getDate()).padStart(2, '0'); // Ensure two-digit day
//     const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     const year = today.getFullYear();

//     // Format as DD-MM-YYYY
//     const formattedDate = `${day}-${month}-${year}`;
//     dateInput.value = formattedDate; // Set as default value
// }

// validation of the input
function validateModalInput(){
    const expenseAmount = document.querySelector('#expenseAmount').value.trim()
    const expenseDescription = document.querySelector('#expenseDescription').value.trim()
    const expenseCategory = document.querySelector('#expenseCategory').value
    const expenseDate = document.querySelector('#inputDate').value

    const amountErr = document.querySelector('#amountErr');
    const descriptionErr = document.querySelector('#descriptionErr');
    const dateErr = document.querySelector('#dateErr');
    let isValid = true

    amountErr.classList.add('hide');
    descriptionErr.classList.add('hide');
    dateErr.classList.add('hide');

    if (!expenseAmount) {
        isValid = false;
        amountErr.textContent = 'Expense amount is required.';
        amountErr.classList.remove('hide');

    } else if (isNaN(expenseAmount) || parseFloat(expenseAmount) <= 0) {
        isValid = false;
        amountErr.textContent = 'Amount must be a positive number.';
        amountErr.classList.remove('hide');
    } else{
        amountErr.classList.add('hide');
    }
    
    const descriptionRegex = /^[a-zA-Z0-9\s]+$/;
    if (!expenseDescription) {
        isValid = false;
        descriptionErr.textContent = 'Description is required.';
        descriptionErr.classList.remove('hide');

    } else if (!descriptionRegex.test(expenseDescription)) {
        isValid = false;
        descriptionErr.textContent = 'Invalid description. Only letters, numbers, and spaces are allowed.';
        descriptionErr.classList.remove('hide');
    } else{
        descriptionErr.classList.add('hide');
    }

    if (!expenseCategory) {
        isValid = false;
        console.log('Expense category validation failed');
    }
 
    // expenseDate needs to be validated
    if (!expenseDate) {
        isValid = false;
        dateErr.textContent = 'Date is required.';
        dateErr.classList.remove('hide');
    } else{
        dateErr.classList.add('hide');
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
    // else{
    //     alert('validation failed...')
    // }

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

    const activeSection = localStorage.getItem("activeSection");

    if (activeSection === "summary") {
        expenseListWrapperDiv.classList.add("hide");
        chartWrapperDiv.classList.remove("hide");
    } else {
        expenseListWrapperDiv.classList.remove("hide");
        chartWrapperDiv.classList.add("hide");
    }

    reloadExpenseList()
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
            title:{
                display: true,
                text: 'Total expenses by category'
            }
        }
    }
})

// // chart2: bar chart
// const {labels, data} = updateMonthlyTrendData()

// const ctx2 = document.getElementById('myChart2')
// let myChart23 = new Chart(ctx2, {
//     type:'line',
//     data: {
//         labels: labels,
//         datasets: [{
//             label: 'Monthly Expenses',
//             data: data,
//             borderColor: 'rgba(75, 192, 192, 1)',
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             fill: true,
//             lineTension: 0.2
//         }]
//     },
//     options:{
//         responsive: true,
//                 scales: {
//                     x: {
//                         title: {
//                             display: true,
//                             text: 'Month'
//                         }
//                     },
//                     y: {
//                         title: {
//                             display: true,
//                             text: 'Total Expense ($)'
//                         },
//                         beginAtZero: true
//                     }
//                 }
//     },
// })
const ctx2 = document.getElementById('myChart2');
let myChart23 = new Chart(ctx2, {
    type: 'line', // Line chart type
    data: {
        labels: [], // Placeholder for months, will be populated dynamically
        datasets: [{
            label: 'Total Expenses', // Single dataset for total expenses
            data: [], // Placeholder for total expenses for each month
            borderColor: 'rgba(75, 192, 192, 1)', // Line color
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color
            fill: true, // Fill the area under the line
            tension: 0.1 // Smooth the line
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Monthly Total Expenses'
            }
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

// function updateMonthlyTrendData() {
//     // Initialize an object to hold monthly totals
//     let monthlyTotals = {};

//     // Iterate over the expenses in expenseList
//     expenseList.forEach(expense => {
//         const date = new Date(expense.date); // Assuming expense.date is a valid date string
//         const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // Format as "YYYY-MM"

//         // Aggregate the total expenses for each month
//         if (monthlyTotals[monthKey]) {
//             monthlyTotals[monthKey] += expense.expenseAmount;
//         } else {
//             monthlyTotals[monthKey] = expense.expenseAmount;
//         }
//     });

//     // Convert monthlyTotals to arrays for labels and data
//     const labels = Object.keys(monthlyTotals).sort(); // Sorted list of months (e.g., ["2024-01", "2024-02", ...])
//     const data = labels.map(month => monthlyTotals[month]); // Corresponding expense amounts

//     // Log the processed data for debugging
//     console.log("Monthly Labels:", labels);
//     console.log("Monthly Data:", data);

//     // Return the labels and data in an object for chart usage
//     return { labels, data };
// }

function updateChartData2() {
    let totalMonthlyExpenses = []; // Array to store the total expense for each month
    let months = []; // Array to hold months or time periods

    // Iterate over the expense list to calculate total expenses for each month
    expenseList.forEach(expense => {
        // Extract the month and year from the date (dd-mm-yyyy)
        let dateParts = expense.expenseDate.split('-'); // Split by '-'
        let month = dateParts[1]; // Month part (mm)
        let year = dateParts[2]; // Year part (yyyy)
        let monthYear = `${month}-${year}`; // Format as 'mm-yyyy'

        // If the month is not already in the months array, add it
        if (!months.includes(monthYear)) {
            months.push(monthYear);
            totalMonthlyExpenses.push(0); // Initialize total expense for the new month
        }

        // Find the index of the current month and add the expense amount to it
        let monthIndex = months.indexOf(monthYear);
        totalMonthlyExpenses[monthIndex] += expense.expenseAmount; // Sum the expense
    });

    // Sort months in ascending order (from '01-2024' to '12-2024')
    let sortedMonths = months.map(month => {
        // Split the month into 'mm' and 'yyyy' and convert them into a sortable format
        let [monthNumber, year] = month.split('-');
        return { monthNumber: parseInt(monthNumber), year: parseInt(year), month };
    })
    .sort((a, b) => {
        // Sort by year first, then by month
        return a.year === b.year ? a.monthNumber - b.monthNumber : a.year - b.year;
    })
    .map(item => item.month); // Get the original 'mm-yyyy' format

    // Create a new total monthly expenses array based on sorted months
    let sortedTotalExpenses = sortedMonths.map(sortedMonth => {
        let monthIndex = months.indexOf(sortedMonth);
        return totalMonthlyExpenses[monthIndex];
    });

    // Update the chart labels (sorted months in 'mm-yyyy' format)
    myChart23.data.labels = sortedMonths;

    // Update the dataset with the sorted total expenses for each month
    myChart23.data.datasets[0].data = sortedTotalExpenses;

    // If no expenses, hide the chart
    if (!expenseList.length) {
        canvasWrapper.classList.add('hide');
    } else {
        canvasWrapper.classList.remove('hide');
        myChart23.update();
    }
}
