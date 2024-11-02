const addTaskButton = document.getElementById("addTaskButton");
const addTaskInput = document.getElementById("addTaskInput");
const taskList = document.querySelector("ul.taskList");
const clearAllButton = document.getElementById("deleteAllTasks");
const inputValidation = /^[a-zA-Z1-9]/;
const inputValidationCategory = /^[a-zA-Z]/;

// array of objects
let taskArray = [];

// Add new task
function addNewTask() {
    let taskDesc = addTaskInput.value.trim()
    if (taskDesc === "") {
        alert("Cannot add an empty task ... \nPlease provide a task description ...")
        return
    } else if (!inputValidation.test(taskDesc)) {
        alert("Task Description should begin with alphanumeric characters ... \nPlease provide a valid task description ...")
        return
    }

    
    let taskLabel = document.getElementById("addTaskInputCategory")
    if (taskLabel.value.trim() === "") {
        alert("Category/label can't be empty ...")
        return
    } else if (inputValidationCategory.test(taskLabel.value) == false) {
        alert("Category should begin with letters ... \nPlease provide a valid task category ...")
        return
    }

    // Get priority
    let taskPriority = document.getElementById("taskPriority").value
    const li = document.createElement("li")
    li.classList.add("newTask")

    // check task priority.
    if (taskPriority === "important") {
        li.classList.add("importantTask")
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
            <span class="priorityLabel "><strong>Priority:</strong> ${taskPriority}</span>
            <span class="taskLabel"><strong>Category:</strong> ${taskLabel.value}</span>
        </div>
        <i class="fa-regular fa-circle-xmark cross"></i>
    `;

    let taskId = taskArray.length
    li.setAttribute("data-task-id", taskId)
    taskList.insertBefore(li, taskList.firstChild)

    addTaskInput.value = ""

    let listJson = {
        taskId: taskId,
        taskDesc: taskDesc,
        completed: false,
        taskLabel: taskLabel.value,
        priority: taskPriority
    }

    taskLabel.value = ""

    // push task in the taskArray
    taskArray.push(JSON.stringify(listJson))
    saveData()
    toggleClearAllButton()
}

// add eventListeners for mark as complete, edit, and remove task
taskList.addEventListener('click', (event) => {
    const target = event.target
    
    // 
    const li = target.closest('li') 
    const taskId = li?.getAttribute('data-task-id')

    // for click on tickIcon
    if (target.classList.contains('tick')) {
        markAsComplete(li, taskId)
    } 
    // for click on crossIcon
    else if (target.classList.contains('cross')) {
        removeTask(li, taskId)
    }
    // for click on task description to edit it 
    else if (target.classList.contains('taskDesc')) {
        editTaskDescription(li, target, taskId)
    }
})

//  mark the task as completed. if already completed, don't toggle
function markAsComplete(li, taskId) {
    const tickIcon = li.querySelector("i.tick");
    const taskLabel = li.querySelector("span.taskLabel")
    const prioritySpan = li.querySelector("span.priorityLabel")
    // console.log("mark as complete: ",li)

    if (li.querySelector('.taskDesc').classList.contains('completed')) {
        return
    } 
    else {
        // task is todo. change it
        li.querySelector('.taskDesc').classList.add('completed')
        tickIcon.classList.replace("fa-regular", "fa-solid")
        taskLabel.classList.toggle("completed")
        prioritySpan.classList.toggle("completed")
        // if task is important, remove its bg color to indicate now its done        
    }

    for (let i = 0; i < taskArray.length; i++) {
        let taskObject = JSON.parse(taskArray[i])

        if (taskObject.taskId == taskId) {
            taskObject.completed = true
            taskArray[i] = JSON.stringify(taskObject)
            break
        }
    }
    saveData()
}

// remove the task from both the taskList and taskArray as well
function removeTask(li, taskId) {
    // remove task from taskList
    li.remove()

    // remove task from taskArray
    taskArray = taskArray.filter(taskString => {
        let taskObject = JSON.parse(taskString)
        return taskObject.taskId != taskId
    })
    toggleClearAllButton()
    saveData()
}

// change the taskDesc
function editTaskDescription(li, span, taskId) {

    // check if task is alreaxdy completed
    if (span.classList.contains("completed")) return

    const spanWrapper = li.querySelector("div.spanWrapper")
    const currentDesc = span.textContent
    const input = document.createElement("input")
    input.type = "text"
    input.value = currentDesc

    // input box style same as span
    const computedStyle = window.getComputedStyle(span)
    input.style.width = computedStyle.width
    input.style.height = computedStyle.height
    input.style.fontSize = computedStyle.fontSize
    input.style.padding = computedStyle.padding
    input.style.border = computedStyle.border

    //insert input
    spanWrapper.insertBefore(input, span)
    span.remove()
    input.focus()

    input.addEventListener("blur", function () {
        const newDesc = input.value.trim() || currentDesc

        if (inputValidation.test(newDesc) == false) {
            alert("Please enter a valid task description...")
            input.focus()
            input.value = ""
            return
        }

        // update the taskList
        span.textContent = newDesc
        spanWrapper.insertBefore(span, input)
        input.remove()

        // update the taskArray
        for (let i = 0; i < taskArray.length; i++) {
            let taskObject = JSON.parse(taskArray[i])
            if (taskObject.taskId === parseInt(taskId)) {
                taskObject.taskDesc = newDesc
                taskArray[i] = JSON.stringify(taskObject)
                break
            }
        }
        saveData()
    })
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

// add event listeners to the filter buttons
let filterAllButton = document.getElementById("filterAll")
let filterTodoButton = document.getElementById("filterTodo")
let filterCompletedButton = document.getElementById("filterCompleted")
let filterImportantButton = document.getElementById("filterImportant")
let filterNormalButton = document.getElementById("filterNormal")

filterAllButton.addEventListener('click', () => {
    filterTasks('all');
    setActiveButton(filterAllButton);
    console.log("clicked on all")
})

filterTodoButton.addEventListener('click', () => {
    filterTasks('todo');
    setActiveButton(filterTodoButton);
    console.log("clicked on todo")
})

filterCompletedButton.addEventListener('click', () => {
    filterTasks('completed');
    setActiveButton(filterCompletedButton);
    console.log("clicked on complete")
})

filterImportantButton.addEventListener('click', () => {
    filterTasks('important');
    setActiveButton(filterImportantButton);
    console.log("clicked on important")
})

filterNormalButton.addEventListener('click', () => {
    filterTasks('normal');
    setActiveButton(filterNormalButton);
    console.log("clicked on normal")
})


// Filter tasks based on the selected category (all, todo, completed, important, normal)
function filterTasks(filterType) {
    taskList.innerHTML = ""

    let filteredTasks = taskArray.filter(taskString => {
        let taskObject = JSON.parse(taskString)
        if (filterType === 'all') {
            return true; // Show all tasks
        } else if (filterType === 'todo') {
            // todo i.e not completed
            return !taskObject.completed
        } else if (filterType === 'completed') {
            // only completed
            return taskObject.completed 
        }else if (filterType === 'important') {
            // only important 
            return taskObject.priority === 'important'
        } else if (filterType === 'normal') {
            // only normal
            return taskObject.priority === 'normal'
        }

        return false
    })

    // reverse the filtered tasks
    // find a better way to do this
    filteredTasks = filteredTasks.reverse()

    // display the filtered tasks
    filteredTasks.forEach(taskString => {
        const taskObject = JSON.parse(taskString)
        const li = document.createElement('li')
        li.classList.add('newTask')
        li.setAttribute('data-task-id', taskObject.taskId)

        // check if task is completed or not
        const completedClass = taskObject.completed ? "completed" : ""
        const tickIconClass = taskObject.completed ? "fa-solid" : "fa-regular" 
        const taskLabel = taskObject.taskLabel ? taskObject.taskLabel.toString() : "Default"
        const currTaskPriority = (taskObject.priority == 'important') ? "importantTask" : ""
        if(currTaskPriority != ""){
            li.classList.add("importantTask")
        }
        
        li.innerHTML = 
            `
                <i class="${tickIconClass} fa-circle-check tick"></i>
                <div class="spanWrapper"> 
                    <span class="taskDesc ${completedClass}">${taskObject.taskDesc}</span>
                    <span class="priorityLabel ${completedClass}"><strong>Priority:</strong> ${taskObject.priority}</span>
                    <span class="taskLabel ${completedClass}"><strong>Category:</strong> ${taskLabel}</span>
                </div>
                <i class="fa-regular fa-circle-xmark cross"></i>
            `;
        
        taskList.appendChild(li);
    })

    // saveData()
    // showData()
}


// add background onclick to filter buttons
function setActiveButton(activeButton) {
    // remove the bg from all.
    filterAllButton.classList.remove('active');
    filterTodoButton.classList.remove('active');
    filterCompletedButton.classList.remove('active');
    filterImportantButton.classList.remove('active');
    filterNormalButton.classList.remove('active');

    // add active class to the clicked button
    activeButton.classList.add('active');
}

// hide the clear all and filter buttons if no tasks are present
function toggleClearAllButton() {
    let filterStatusContainer = document.querySelector("#filterStatusContainer")
    let filterPriorityContainer = document.querySelector("#filterPriorityContainer")
    let buttonContainer = document.querySelector("div.buttonContainer")
    // container and not button
    //clearAllButton.style.display = taskList.children.length ? "block" : "none";
   if(taskList.children.length === 0){
        // clearAllButton.style.display = "none"
        buttonContainer.style.display = "none"
        filterStatusContainer.style.display = "none"
        filterPriorityContainer.style.display = "none"
   }
   else{
        buttonContainer.style.display = "flex"
        filterStatusContainer.style.display = "flex"
        filterPriorityContainer.style.display = "flex"
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
        
        // iterate over all tasks
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
            if (currTaskPriority != "") li.classList.add(currTaskPriority)
            
            li.innerHTML = 
            `
            <i class="${tickIcon} fa-circle-check tick"></i>
            <div class="spanWrapper">
                <span class="taskDesc ${completedClass}">${taskObject.taskDesc}</span>
                <span class="priorityLabel ${completedClass}"><strong>Priority:</strong> ${taskObject.priority}</span>
                <span class="taskLabel ${taskLabelCompleted}"><strong>Category:</strong> ${taskLabel}</span>
            </div>
            
            <i class="fa-regular fa-circle-xmark cross"></i>
            `

            taskList.appendChild(li)
            toggleClearAllButton() 
        })
    }
}

// when no tasks are there, hide the buttons.
toggleClearAllButton()
showData() 
