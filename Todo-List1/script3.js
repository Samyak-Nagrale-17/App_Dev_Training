const addTaskButton = document.getElementById("addTaskButton");
const addTaskInput = document.getElementById("addTaskInput");
const taskList = document.querySelector("ul.taskList");
const clearAllButton = document.getElementById("deleteAllTasks");
const inputValidation = /^[a-zA-Z1-9]/;
const inputValidationCategory = /^[a-zA-Z]/;

let taskArray = [];

// Add new task
function addNewTask() {
    let taskDesc = addTaskInput.value.trim();
    if (taskDesc === "") {
        alert("Cannot add an empty task ... \nPlease provide a task description ...");
        return;
    } else if (inputValidation.test(taskDesc) == false) {
        alert("Task Description should begin with alphanumeric characters ... \nPlease provide a valid task description ...");
        return;
    }

    let taskLabel = document.getElementById("addTaskInputCategory");
    if (taskLabel.value.trim() === "") {
        alert("Category/label can't be empty ...");
        return;
    } else if (inputValidationCategory.test(taskLabel.value) == false) {
        alert("Category should begin with letters ... \nPlease provide a valid task category ...");
        return;
    }

    // Get priority
    let taskPriority = document.getElementById("taskPriority").value;
    const li = document.createElement("li");
    li.classList.add("newTask");

    // temp
    if (taskPriority === "important") {
        li.classList.add("importantTask");  // Add a special class for styling important tasks
    }

    // Add icons
    // li.innerHTML =
    //     `
    // <i class="fa-regular fa-circle-check tick"></i>
    // <div class="spanWrapper">
    //     <span class="taskDesc">${taskDesc}</span>
    //     <span class="taskLabel"><strong>Category:</strong> ${taskLabel.value}</span>
    // </div>
    // <i class="fa-regular fa-circle-xmark cross"></i>
    // `;

    li.innerHTML = `
        <i class="fa-regular fa-circle-check tick"></i>
        <div class="spanWrapper">
            <span class="taskDesc">${taskDesc}</span>
            <span class="taskLabel"><strong>Category:</strong> ${taskLabel.value}</span>
        </div>
        <span class="priorityLabel">${taskPriority.charAt(0).toUpperCase() + taskPriority.slice(1)}</span>
        <i class="fa-regular fa-circle-xmark cross"></i>
    `;

    let taskId = taskArray.length;
    li.setAttribute("data-task-id", taskId);
    taskList.insertBefore(li, taskList.firstChild);

    addTaskInput.value = "";

    let listJson = {
        taskId: taskId,
        taskDesc: taskDesc,
        completed: false,
        taskLabel: taskLabel.value,
        priority: taskPriority
    };

    taskLabel.value = "";

    taskArray.push(JSON.stringify(listJson));
    saveData();
    toggleClearAllButton();
}

// Event delegation for mark as complete, edit, and remove task
taskList.addEventListener('click', (event) => {
    const target = event.target;
    const li = target.closest('li');
    const taskId = li?.getAttribute('data-task-id');

    if (target.classList.contains('tick')) {
        markAsComplete(li, taskId);
    } else if (target.classList.contains('cross')) {
        removeTask(li, taskId);
    } else if (target.classList.contains('taskDesc')) {
        editTaskDescription(li, target, taskId);
    }
});

function markAsComplete(li, taskId) {
    const tickIcon = li.querySelector("i.tick");
    const taskLabel = li.querySelector("span.taskLabel");

    if (li.querySelector('.taskDesc').classList.contains('completed')) {
        return;
    } else {
        li.querySelector('.taskDesc').classList.add('completed');
        tickIcon.classList.replace("fa-regular", "fa-solid");
        taskLabel.classList.toggle("completed");
    }

    for (let i = 0; i < taskArray.length; i++) {
        let taskObject = JSON.parse(taskArray[i]);

        if (taskObject.taskId == taskId) {
            taskObject.completed = true;
            taskArray[i] = JSON.stringify(taskObject);
            break;
        }
    }
    saveData();
}

function removeTask(li, taskId) {
    li.remove();

    taskArray = taskArray.filter(taskString => {
        let taskObject = JSON.parse(taskString);
        return taskObject.taskId != taskId;
    });
    toggleClearAllButton();
    saveData();
}

function editTaskDescription(li, span, taskId) {

    // check if task is alreaxdy completed
    if (span.classList.contains("completed")) return;

    const spanWrapper = li.querySelector("div.spanWrapper");
    const currentDesc = span.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentDesc;

    const computedStyle = window.getComputedStyle(span);
    input.style.width = computedStyle.width;
    input.style.height = computedStyle.height;
    input.style.fontSize = computedStyle.fontSize;
    input.style.padding = computedStyle.padding;
    input.style.border = computedStyle.border;

    spanWrapper.insertBefore(input, span);
    span.remove();
    input.focus();

    input.addEventListener("blur", function () {
        const newDesc = input.value.trim() || currentDesc;

        if (inputValidation.test(newDesc) == false) {
            alert("Please enter a valid task description...");
            input.focus();
            input.value = "";
            return;
        }

        span.textContent = newDesc;
        spanWrapper.insertBefore(span, input);
        input.remove();

        for (let i = 0; i < taskArray.length; i++) {
            let taskObject = JSON.parse(taskArray[i]);
            if (taskObject.taskId === parseInt(taskId)) {
                taskObject.taskDesc = newDesc;
                taskArray[i] = JSON.stringify(taskObject);
                break;
            }
        }
        saveData();
    });
}

// Other functions (clear all, filter, saveData, toggleClearAllButton) remain the same

// clear all tasks. remove all the tasks from the taskArray as well
clearAllButton.addEventListener('click', deleteAllTasks)
function deleteAllTasks(){
    if (confirm("Are you sure you want to delete all tasks?")){
        taskList.innerHTML = ""
        // clear the task array
        taskArray = []
        toggleClearAllButton()
        saveData()
    }
    else{
        return
    }
}

// filter the task by their status.
let filterAllButton = document.getElementById("filterAll")
let filterTodoButton = document.getElementById("filterTodo")
let filterCompletedButton = document.getElementById("filterCompleted")
// Filter tasks by priority
let filterImportantButton = document.getElementById("filterImportant");
let filterNormalButton = document.getElementById("filterNormal");


filterAllButton.addEventListener('click', () => {
    filterTasks('all')
    setActiveButton(filterAllButton)
})

filterTodoButton.addEventListener('click', () => {
    filterTasks('todo') 
    setActiveButton(filterTodoButton)
})

filterCompletedButton.addEventListener('click', () => {
    filterTasks('completed')
    setActiveButton(filterCompletedButton)
})

filterImportantButton.addEventListener('click', () => {
    filterTasks('important');
    setActivePriorityButton(filterImportantButton);
});

filterNormalButton.addEventListener('click', () => {
    filterTasks('normal');
    setActivePriorityButton(filterNormalButton);
});


// Filter tasks based on the selected category
function filterTasks(filterType) {
    taskList.innerHTML = "";

    let filteredTasks = taskArray.filter(taskString => {
        let taskObject = JSON.parse(taskString);
        if (filterType === 'all') {
            return true; // Show all tasks
        } else if (filterType === 'todo') {
            // todo i.e not completed
            return !taskObject.completed
        } else if (filterType === 'completed') {
            // only completed
            return taskObject.completed 
        }else if (filterType === 'important') {
            return taskObject.priority === 'important'; // Show important tasks
        } else if (filterType === 'normal') {
            return taskObject.priority === 'normal'; // Show normal tasks
        }

        return false;
    });

    // reverse the filtered tasks
    // find a better way to do this
    filteredTasks = filteredTasks.reverse();

    // display the filtered tasks
    filteredTasks.forEach(taskString => {
        const taskObject = JSON.parse(taskString);
        const li = document.createElement('li');
        li.classList.add('newTask');
        li.setAttribute('data-task-id', taskObject.taskId);

        // check if task is completed or not
        const completedClass = taskObject.completed ? "completed" : "";
        const tickIconClass = taskObject.completed ? "fa-solid" : "fa-regular"; 
        const taskLabel = taskObject.taskLabel ? taskObject.taskLabel.toString() : "Default" 
        li.innerHTML =
            `
                <i class="${tickIconClass} fa-circle-check tick"></i>
                <div class="spanWrapper">
                    <span class="taskDesc ${completedClass}">${taskObject.taskDesc}</span>
                    <span class="taskLabel ${completedClass}"><strong>Category:</strong> ${taskLabel}</span>
                </div>
                <span class="priorityLabel">${taskObject.priority}</span>
                <i class="fa-regular fa-circle-xmark cross"></i>
            `;

        taskList.appendChild(li);
    });

    // saveData()
    // addEventListenerToTaskDesc();
    // checkTickIcon();
    // checkCrossIcon();
    // showData()
}

// add bg to the filter button
function setActiveButton(activeButton) {
    // // Remove active class from all buttons
    // filterAllButton.classList.remove('active');
    // filterTodoButton.classList.remove('active');
    // filterCompletedButton.classList.remove('active');
    
    // // Add active class to the clicked button
    // activeButton.classList.add('active');

        // Remove active class from all buttons
        filterAllButton.classList.remove('active');
        filterTodoButton.classList.remove('active');
        filterCompletedButton.classList.remove('active');
        
        // Reset priority buttons when a status button is clicked
        filterImportantButton.classList.remove('active');
        filterNormalButton.classList.remove('active');
    
        // Add active class to the clicked button
        activeButton.classList.add('active');
}

// add bg to priority button
function setActivePriorityButton(activeButton) {
    // Remove active class from all priority buttons
    filterImportantButton.classList.remove('active');
    filterNormalButton.classList.remove('active');
    
    // // Add active class to the clicked button
    // activeButton.classList.add('active');

       // Remove active class from all status buttons
       filterAllButton.classList.remove('active');
       filterTodoButton.classList.remove('active');
       filterCompletedButton.classList.remove('active');
       
       // Add active class to the clicked priority button
       activeButton.classList.add('active');
}

// hide the clear all and filter buttons if no tasks are present
function toggleClearAllButton() {
    let filterContainer = document.querySelector("div.filterContainer")
    let buttonContainer = document.querySelector("div.buttonContainer")
    // container and not button
    //clearAllButton.style.display = taskList.children.length ? "block" : "none";
   if(taskList.children.length === 0){
        // clearAllButton.style.display = "none"
        buttonContainer.style.display = "none"
        filterContainer.style.display = "none"
   }
   else{
        buttonContainer.style.display = "flex"
        filterContainer.style.display = "flex"
   }
   return
}

// save the tasks in the local storage
function saveData(){
    localStorage.setItem("tasks", JSON.stringify(taskArray)) 
}

function showData(){
    const tasks = localStorage.getItem("tasks")
    if(tasks){
        taskArray = JSON.parse(tasks)
        taskList.innerHTML = ""

        //reverse the taskArray
        // original taskArray is unchanged
        const tempTaskArray = Array.from(taskArray).reverse()
        
        tempTaskArray.forEach(taskString => {
            const taskObject = JSON.parse(taskString)
            // console.log(taskObject) 
            const li = document.createElement('li')
            li.classList.add('newTask') 
            li.setAttribute('data-task-id', taskObject.taskId)
            const completedClass = taskObject.completed ? "completed" : ""
            const tickIcon = (completedClass == "completed") ? "fa-solid" : "fa-regular"
            const taskLabel = taskObject.taskLabel ? taskObject.taskLabel.toString() : "Default"
            const taskLabelCompleted = completedClass ? "completed" : "";
            // console.log("taskLabelCompleted value is (completed/)", taskLabelCompleted) 
            const currTaskPriority = (taskObject.priority == 'important') ? "importantTask" : ""
            // li.classList.add(currTaskPriority)
            li.innerHTML = 
            `
            <i class="${tickIcon} fa-circle-check tick"></i>
            <div class="spanWrapper">
                <span class="taskDesc ${completedClass}">${taskObject.taskDesc}</span>
                <span class="taskLabel ${taskLabelCompleted}"><strong>Category:</strong> ${taskLabel}</span>
            </div>
            <span class="priorityLabel">${taskObject.priority}</span>
            <i class="fa-regular fa-circle-xmark cross"></i>
            `

            taskList.appendChild(li)
            // addEventListenerToTaskDesc()
            // checkTickIcon()
            // checkCrossIcon()
            toggleClearAllButton() 
        })
    }
}
// document.addEventListener("DOMContentLoaded", showData)
// when no tasks are there, hide the buttons.
toggleClearAllButton()
showData() 



// clear this 
// Remove active class from filter buttons when clicking outside
// document.addEventListener('click', (event) => {
//     // Check if the click target is outside the filter buttons
//     if (!event.target.matches('.filterButton')) {
//         // Remove the active class from all filter buttons
//         filterAllButton.classList.remove('active');
//         filterTodoButton.classList.remove('active');
//         filterCompletedButton.classList.remove('active');
//         filterImportantButton.classList.remove('active');
//         filterNormalButton.classList.remove('active');
//     }
// }); 