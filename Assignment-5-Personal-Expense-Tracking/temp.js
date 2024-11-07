
// chart js code
// // data
// const ctx = document.getElementById('myChart');
// new Chart(ctx, {
//     type:'doughnut',
//     data:{
//         datasets:[{
//             // data:[{Category:"Food",totalExpense:100}, 
//             //     {Category:"Util",totalExpense:200},
//             //      {Category:"Fuel",totalExpense:300}]

//             data:[

//             ] 
//         }],
        
//         labels: [
//             'Food',
//             'Util',
//             'Fuel'
//         ]
//     },
// })


// Track the active expense div being edited
let activeExpenseDiv = null;

// Event listener for edit button
document.querySelectorAll('.editExpenseDiv').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent triggering the "click outside" logic
        const expenseDiv = event.target.closest('.expenseDiv');
        launchEditInputs(expenseDiv);
    });
});

// Launch input fields in place of div content
function launchEditInputs(expenseDiv) {
    // Track which expense div is active
    activeExpenseDiv = expenseDiv;

    // Get current values from div
    const expenseDate = expenseDiv.querySelector('.expenseDivDate').innerText;
    const expenseDescription = expenseDiv.querySelector('.expenseDivDescription').innerText;
    const expenseAmount = expenseDiv.querySelector('.expenseDivAmount').innerText.replace('$', ''); // Remove dollar sign
    const expenseCategory = expenseDiv.querySelector('.expenseDivCategory').innerText;

    // Replace with input fields
    expenseDiv.querySelector('.expenseDivDate').innerHTML = `<input type="text" class="editDate" value="${expenseDate}">`;
    expenseDiv.querySelector('.expenseDivDescription').innerHTML = `<input type="text" class="editDescription" value="${expenseDescription}">`;
    expenseDiv.querySelector('.expenseDivAmount').innerHTML = `<input type="number" class="editAmount" value="${expenseAmount}">`;
    expenseDiv.querySelector('.expenseDivCategory').innerHTML = `<input type="text" class="editCategory" value="${expenseCategory}">`;

    // Add event listener to detect click outside
    document.addEventListener('click', handleClickOutside);
}

// Handle click outside for validation
function handleClickOutside(event) {
    if (activeExpenseDiv && !activeExpenseDiv.contains(event.target)) {
        // Run validation and update if valid
        if (validateEditInputs(activeExpenseDiv)) {
            updateExpenseUI(activeExpenseDiv);
        } else {
            console.log("Validation failed. Please correct the fields.");
        }

        // Remove the event listener and reset active div
        document.removeEventListener('click', handleClickOutside);
        activeExpenseDiv = null;
    }
}

// Validation function for in-line edit fields
function validateEditInputs(expenseDiv) {
    const dateInput = expenseDiv.querySelector('.editDate').value.trim();
    const descriptionInput = expenseDiv.querySelector('.editDescription').value.trim();
    const amountInput = expenseDiv.querySelector('.editAmount').value.trim();
    const categoryInput = expenseDiv.querySelector('.editCategory').value.trim();

    let isValid = true;

    // Validate amount
    if (isNaN(amountInput) || parseFloat(amountInput) <= 0) {
        isValid = false;
        console.log("Amount must be a positive number.");
    }

    // Validate description (only alphanumeric characters)
    const descriptionRegex = /^[a-zA-Z0-9\s]+$/;
    if (!descriptionRegex.test(descriptionInput)) {
        isValid = false;
        console.log("Description must contain only letters and numbers.");
    }

    // Validate date in dd-mm-yyyy format
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(dateInput)) {
        isValid = false;
        console.log("Date format should be dd-mm-yyyy.");
    }

    return isValid;
}

// Update the UI and expense object with validated values
function updateExpenseUI(expenseDiv) {
    const dateInput = expenseDiv.querySelector('.editDate').value.trim();
    const descriptionInput = expenseDiv.querySelector('.editDescription').value.trim();
    const amountInput = parseFloat(expenseDiv.querySelector('.editAmount').value.trim());
    const categoryInput = expenseDiv.querySelector('.editCategory').value.trim();

    // Update expense object in expenseList
    const expenseId = expenseDiv.getAttribute('dataExpenseId');
    const expenseToEdit = expenseList.find(expense => expense.expenseId === parseInt(expenseId));
    if (expenseToEdit) {
        expenseToEdit.expenseAmount = amountInput;
        expenseToEdit.expenseDescription = descriptionInput;
        expenseToEdit.expenseCategory = categoryInput;
        expenseToEdit.expenseDate = dateInput;
    }

    // Update UI
    expenseDiv.querySelector('.expenseDivDate').innerText = dateInput;
    expenseDiv.querySelector('.expenseDivDescription').innerText = descriptionInput;
    expenseDiv.querySelector('.expenseDivAmount').innerText = `$${amountInput}`;
    expenseDiv.querySelector('.expenseDivCategory').innerText = categoryInput;

    // Save changes to localStorage
    saveToLocalStorage();
}




// chart
// Initialize the chart
const ctx = document.getElementById('myChart')   //.getContext('2d')
let myChart = new Chart(ctx, {
    type: 'doughnut', // Define chart type
    data: {
        labels: ['Food', 'Fuel', 'Utility', 'Transportation', 'Miscellaneous'], // Categories for the doughnut chart
        datasets: [{
            // label: ['Food', 'Fuel', 'Utility', 'Transportation', 'Misc'],
            data: [0, 0, 0, 0, 0], // Initial data (will be updated)
            // data:Object.values(tempData2),
            // backgroundColor: [
            //     'rgba(255, 99, 132, 0.2)', // Food
            //     'rgba(54, 162, 235, 0.2)', // Fuel
            //     'rgba(255, 206, 86, 0.2)', // Utility
            //     'rgba(75, 192, 192, 0.2)', // Transportation
            //     'rgba(153, 102, 255, 0.2)'  // Miscellaneous
            // ],
            // borderColor: [
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)'
            // ],
            // borderWidth: 1
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
})