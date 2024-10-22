const addTaskButton = document.getElementById("addTaskButton")
const addTaskInput = document.getElementById("addTaskInput")
const taskList = document.querySelector("ul.taskList")
const clearAllButton = document.getElementById("deleteAllTasks")
const inputValidation = /^[a-zA-Z1-9]/;
const inputValidationCategory = /^[a-zA-Z]/;

// arrayof json objects
let taskArray = []

// add new task
function addNewTask() {
    let taskDesc = addTaskInput.value.trim()
    if (taskDesc === "") {
        alert("Cannot add an empty task ... \nPlease provide a task description ...")
        return
    }
    else if(inputValidation.test(taskDesc) == false){
        alert("Task Description should begin with alphanumeric characters ... \nPlease provide a valid task description ...")
        return
    }

    let taskLabel = document.getElementById("addTaskInputCategory") 
    if(taskLabel.value.trim() === ""){
        alert("Category/label can't be empty ...")
        return
    }
    else if(inputValidationCategory.test(taskLabel.value) == false){
        alert("Category should begin with letters ... \nPlease provide a valid task category ...")
        return
    }

    const li = document.createElement("li")
    li.classList.add("newTask")
    
    // add icons
    li.innerHTML = 
    `
    <i class="fa-regular fa-circle-check tick"></i>
    <div class="spanWrapper">
        <span class="taskDesc">${taskDesc}</span>
        <span class="taskLabel"><strong>Category:</strong> ${taskLabel.value}</span>
    </div>
    <i class="fa-regular fa-circle-xmark cross"></i>
    `;

    // add a taskId
    let taskId = taskArray.length
    li.setAttribute("data-task-id", taskId)

    taskList.insertBefore(li,taskList.firstChild)

    //clear the input feild
    addTaskInput.value = ""

    // display filter and clear all as non-zero tasks
    // toggleClearAllButton()

    // create an object

    let listJson = {
        taskId: taskId,
        taskDesc: taskDesc,
        completed:false,
        taskLabel:taskLabel.value
    };
    taskLabel.value= ""

    // push new task in taskArray
    taskArray.push(JSON.stringify(listJson))
    // console.log(`Following was pushed in localstorage: ${taskArray}`)
    
    saveData()
    addEventListenerToTaskDesc()
    checkTickIcon()
    checkCrossIcon()
    toggleClearAllButton()
}


// mark as complete. change status as 'completed'
// add event listener to all existing tick icons
function checkTickIcon(){
    const tickIcons = document.querySelectorAll('i.tick')

    tickIcons.forEach(icon => {
        icon.addEventListener('click', markAsComplete)
    })
}
function markAsComplete(event){
    const li = event.target.parentElement
    const taskId = li.getAttribute("data-task-id")
    const tickIcon = li.querySelector("i.tick")
    const taskLabel = li.querySelector("span.taskLabel")
    // check if already completed
    if(li.querySelector('.taskDesc').classList.contains('completed')){
        return
    }
    else{
        li.querySelector('.taskDesc').classList.add('completed')
        tickIcon.classList.replace("fa-regular", "fa-solid") 
        taskLabel.classList.toggle("completed")   
    }

    // find this task in the  taskArray to update its status as completed
    for(let i = 0; i < taskArray.length; i++){
        let taskObject = JSON.parse(taskArray[i])

        if(taskObject.taskId == taskId){
            taskObject.completed = true
            //update the taskArray
            taskArray[i] = JSON.stringify(taskObject)
            break;
        }
    }
    saveData();
}


// delete tasks when i.cross is clicked, update it in the taskArray
// add a event listener to all the cross icons
function checkCrossIcon() {
    const crossIcons = document.querySelectorAll('i.cross')

    crossIcons.forEach(icon => {
        icon.addEventListener('click', removeTask)
    })
}

function removeTask(event){
    const li = event.target.parentElement
    const taskId = li.getAttribute("data-task-id")

    li.remove()

    //update the taskArray
    taskArray = taskArray.filter(taskString => {
        let taskObject = JSON.parse(taskString)
        return taskObject.taskId != taskId
    })
    toggleClearAllButton()
    saveData()
}


// edit the task desc. if the task is completed, you cannot complete it
// add a eventlistener to the span
function addEventListenerToTaskDesc(){
    const spans = document.querySelectorAll("li span.taskDesc")

    spans.forEach(span => {
        span.addEventListener('click', editTaskDescription)
    })

    // add the same function in Category
    // const spansCategory = document.querySelectorAll("li span.taskLabel")
    // add the event listener to each of them
    // spansCategory.forEach(span => {
        // span.addEventListener('click', editTaskLabel)
    // }) 
}

// edit the task label i.e. category/label
function editTaskLabel(event){
    let spanWrapper = event.target.parentElement
    const span = spanWrapper.querySelector("span.taskLabel")
    // if task is marked as completed, user cannot edit it
    if (span. classList.contains("completed")) return

    const currentDesc = span.textContent
    const input = document.createElement("input")
    input.type = "text"
    input.value = currentDesc

    // style the input same as span check if if possible with same class
    // toggle the class in classList of input
    const computedStyle = window.getComputedStyle(span);
    input.style.width = computedStyle.width; 
    input.style.height = computedStyle.height; 
    input.style.fontSize = computedStyle.fontSize; 
    input.style.padding = computedStyle.padding; 
    input.style.border = computedStyle.border; 

    spanWrapper.insertBefore(input, span)
    span.remove()
    input.focus()

    input.addEventListener("blur", function () {
        const newDesc = input.value.trim() || currentDesc
        
        // do input validation on this new change
        if(inputValidation.test(newDesc) == false){
            alert("Please enter valid task description...")
            input.focus() 
            input.value = ""
        }
        span.textContent = newDesc
        spanWrapper.insertBefore(span, input)
        input.remove()

        // clear this
        // // Update taskDesc in taskArray
        // const taskId = li.getAttribute("data-task-id");
        // for (let i = 0; i < taskArray.length; i++) {
        //     let taskObject = JSON.parse(taskArray[i]);
        //     if (taskObject.taskId == taskId) {
        //         // Update the taskDesc
        //         taskObject.taskDesc = newDesc; 
        //         // Update taskArray
        //         taskArray[i] = JSON.stringify(taskObject); 
        //         break;
        //     }
        // }
        saveData()
    })
    saveData() 
}


// edit the task desc
function editTaskDescription(event){
    let li = event.target.parentElement
    const span = li.querySelector("span.taskDesc")
    // if task is marked as completed, user cannot edit it
    if (span.classList.contains("completed")) return 
    
    const currentDesc = span.textContent
    const input = document.createElement("input")
    input.type = "text"
    input.value = currentDesc

    // style the input same as the span
    const computedStyle = window.getComputedStyle(span);
    input.style.width = computedStyle.width; 
    input.style.height = computedStyle.height; 
    input.style.fontSize = computedStyle.fontSize; 
    input.style.padding = computedStyle.padding; 
    input.style.border = computedStyle.border; 

    li.insertBefore(input, span)
    span.remove() 
    //autofocus the input field
    input.focus() 
    
    input.addEventListener("blur", function () {
        const newDesc = input.value.trim() || currentDesc
        
        // do input validation on this new change
        if(inputValidation.test(newDesc) == false){
            alert("Please enter valid task description...")
            input.focus() 
            input.value = ""
        }
        span.textContent = newDesc
        li.insertBefore(span, input)
        input.remove()

        // Update taskDesc in taskArray
        const taskId = li.getAttribute("data-task-id");
        for (let i = 0; i < taskArray.length; i++) {
            let taskObject = JSON.parse(taskArray[i]);
            if (taskObject.taskId == taskId) {
                // Update the taskDesc
                taskObject.taskDesc = newDesc; 
                // Update taskArray
                taskArray[i] = JSON.stringify(taskObject); 
                break;
            }
        }
        saveData()
    })
    saveData() 
}

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
                <i class="fa-regular fa-circle-xmark cross"></i>
            `;

        taskList.appendChild(li);
    });

    // saveData()
    addEventListenerToTaskDesc();
    checkTickIcon();
    checkCrossIcon();
    // showData()
}

// add bg to the filter button
function setActiveButton(activeButton) {
    // Remove active class from all buttons
    filterAllButton.classList.remove('active');
    filterTodoButton.classList.remove('active');
    filterCompletedButton.classList.remove('active');
    
    // Add active class to the clicked button
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
        // taskList.innerHTML = ""

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
            li.innerHTML = 
            `
            <i class="${tickIcon} fa-circle-check tick"></i>
            <div class="spanWrapper">
                <span class="taskDesc ${completedClass}">${taskObject.taskDesc}</span>
                <span class="taskLabel ${taskLabelCompleted}"><strong>Category:</strong> ${taskLabel}</span>
            </div>
            <i class="fa-regular fa-circle-xmark cross"></i>
            `

            taskList.appendChild(li)
            addEventListenerToTaskDesc()
            checkTickIcon()
            checkCrossIcon()
            toggleClearAllButton()
        })
    }
}
// document.addEventListener("DOMContentLoaded", showData)
// when no tasks are there, hide the buttons.
toggleClearAllButton()
showData() 