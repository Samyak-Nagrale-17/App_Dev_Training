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

    // add a taskId
    let taskId = taskArray.length
    li.setAttribute("data-task-id", taskId)

    const li = document.createElement("li")
    li.classList.add("newTask")
    // add icons
    li.innerHTML = `
    <i class="fa-regular fa-circle-check tick"></i>
    <span class="taskDesc">${taskDesc}</span>
    <i class="fa-regular fa-circle-xmark cross"></i>
    `;
    // taskList.insertBefore(li,taskList.firstChild)
    taskList.append(li)  
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
    // const taskDesc = li.querySelector('.taskDesc').textContent
    const taskId = li.getAttribute("data-task-id")


    // check if already completed
    if(li.querySelector('.taskDesc').classList.contains('completed')){
        return
    }
    else{
        li.querySelector('.taskDesc').classList.add('completed')
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


function saveData(){
    localStorage.setItem("tasks", taskArray) 
}

function showData(){
    const tasks = localStorage.getItem("tasks")
    if(tasks){
        taskArray = JSON.parse(tasks)
        taskList.innerHTML = ""


        taskArray.forEach(taskString => {
            const taskObject = JSON.parse(taskString)
            const li = document.createElement('li')
            li.classList.add('newTask')

            li.setAttribute('data-task-id', taskObject.taskId)

            const completedClass = taskObject.completed ? "completed" : ""

            li.innerHTML = 
            `
                <i class="fa-regular fa-circle-check tick"></i>
                <span class="taskDesc ${completedClass}">${taskDesc}</span>
                <i class="fa-regular fa-circle-xmark cross"></i>
            `

            taskList.appendChild(li)
            //reattach event listeners after loading data
            checkTickIcon()
        })
    }
}