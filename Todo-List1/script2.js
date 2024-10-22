const addTaskButton = document.getElementById("addTaskButton")
const addTaskInput = document.getElementById("addTaskInput")
const taskList = document.querySelector("ul.taskList")
const clearAllButton = document.getElementById("deleteAllTasks")


// arrayof json objects
let taskArray = []
// add new task
function addNewTask() {
    let taskDesc = addTaskInput.value.trim()
    if (taskDesc === "") {
        alert("Cannot add an empty task ... \nPlease provide a task description ...")
        return
    }

    const li = document.createElement("li")
    li.classList.add("newTask")
    // add icons
    li.innerHTML = `
    <i class="fa-regular fa-circle-check tick"></i>
    <span class="taskDesc">${taskDesc}</span>
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
        completed:false
    };

    taskArray.push(JSON.stringify(listJson))
    console.log(`Following was pushed in localstorage: ${taskArray}`)
    
    saveData()
    addEventListenerToTaskDesc()
    checkTickIcon()
    checkCrossIcon()
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

    // check if already completed
    if(li.querySelector('.taskDesc').classList.contains('completed')){
        return
    }
    else{
        li.querySelector('.taskDesc').classList.add('completed')
        tickIcon.classList.replace("fa-regular", "fa-solid")    
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
    saveData()
}


// edit the task desc. if the task is completed, you cannot complete it
// add a eventlistener to the span
function addEventListenerToTaskDesc(){
    const spans = document.querySelectorAll("li span.taskDesc")

    spans.forEach(span => {
        span.addEventListener('click', editTaskDescription)
    })
}

function editTaskDescription(event){
    let li = event.target.parentElement
    const span = li.querySelector("span.taskDesc")
    // if task is marked as completed, user cannot edit it
    if (span.classList.contains("completed")) {return} 
    
    const currentDesc = span.textContent
    const input = document.createElement("input")
    input.type = "text"
    input.value = currentDesc

    // style the input
    const computedStyle = window.getComputedStyle(span);
    input.style.width = computedStyle.width; // Set width
    input.style.height = computedStyle.height; // Set height
    input.style.fontSize = computedStyle.fontSize; // Match font size
    input.style.padding = computedStyle.padding; // Match padding
    input.style.border = computedStyle.border; 

    li.insertBefore(input, span)
    span.remove() 
    //autofocus the input field
    input.focus() 
    
    input.addEventListener("blur", function () {
        const newDesc = input.value.trim() || currentDesc
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
        saveData()
    } 
    else{
        return
    }
}


// filter the task by their status.
// Assuming you have the following buttons in your HTML
let filterAllButton = document.getElementById("filterAll");
let filterTodoButton = document.getElementById("filterTodo");
let filterCompletedButton = document.getElementById("filterCompleted");

// Add event listeners to the filter buttons
filterAllButton.addEventListener('click', () => {filterTasks('all'); setActiveButton(filterAllButton);});
filterTodoButton.addEventListener('click', () => {filterTasks('todo'); setActiveButton(filterTodoButton);});
filterCompletedButton.addEventListener('click', () => {filterTasks('completed');setActiveButton(filterCompletedButton);});

// Filter tasks based on the selected category
function filterTasks(filterType) {
    // Clear the current displayed tasks
    taskList.innerHTML = "";

    // Filter the taskArray based on the filterType
    let filteredTasks = taskArray.filter(taskString => {
        let taskObject = JSON.parse(taskString);
        if (filterType === 'all') {
            return true; // Show all tasks
        } else if (filterType === 'todo') {
            return !taskObject.completed; // Show only incomplete tasks
        } else if (filterType === 'completed') {
            return taskObject.completed; // Show only completed tasks
        }
        return false;
    });

    // Reverse the filtered tasks
    // if(filterType != "completed") 
        filteredTasks = filteredTasks.reverse();

    // Render the filtered tasks
    filteredTasks.forEach(taskString => {
        const taskObject = JSON.parse(taskString);
        const li = document.createElement('li');
        li.classList.add('newTask');
        li.setAttribute('data-task-id', taskObject.taskId);

        // Determine the class for the tick icon based on completion status
        const completedClass = taskObject.completed ? "completed" : "";
        const tickIconClass = taskObject.completed ? "fa-solid" : "fa-regular"; // Solid if completed, regular if not

        li.innerHTML =
            `
                <i class="${tickIconClass} fa-circle-check tick"></i>
                <span class="taskDesc ${completedClass}">${taskObject.taskDesc}</span>
                <i class="fa-regular fa-circle-xmark cross"></i>
            `;

        taskList.appendChild(li);
    });

    // Reattach event listeners after filtering
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
        // console.log(taskArray)
        
        tempTaskArray.forEach(taskString => {
            const taskObject = JSON.parse(taskString)
            console.log(taskObject) 
            const li = document.createElement('li')
            li.classList.add('newTask') 
            li.setAttribute('data-task-id', taskObject.taskId)
            const completedClass = taskObject.completed ? "completed" : ""
            const tickIcon = (completedClass == "completed") ? "fa-solid" : "fa-regular"

            li.innerHTML = 
            `<i class="${tickIcon} fa-circle-check tick"></i><span class="taskDesc ${completedClass}">${taskObject.taskDesc}</span><i class="fa-regular fa-circle-xmark cross"></i>`

            taskList.appendChild(li)
            addEventListenerToTaskDesc()
            checkTickIcon()
            checkCrossIcon()
        })

    }
}
// document.addEventListener("DOMContentLoaded", showData)
showData() 
