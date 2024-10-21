const addTaskButton = document.getElementById("addTaskButton")
const inputBox = document.querySelector("div.inputBox")
const addTaskInput = document.getElementById("addTaskInput")
const taskContainer = document.querySelector("div.taskContainer")
const taskList = document.querySelector("ul.taskList")
const clearAllButton = document.getElementById("deleteAllTasks")

// add new todo
function addNewTask(){
    if(addTaskInput.value.trim() == ""){
        alert("Cannot add empty task in list... \nPlease give a description ...")
        return
    }

    let li = document.createElement("li")
    li.classList.add("newTask")    
    // add the fontawesome icons
    let tickMark = document.createElement("i")
    let crossMark = document.createElement("i") 
    tickMark.classList.add("fa-regular", "fa-circle-check", "tick")
    crossMark.classList.add("fa-regular","fa-circle-xmark","cross")

    let taskDesc = document.createElement("span")
    taskDesc.classList.add("taskDesc")
    taskDesc.textContent  = addTaskInput.value
    li.appendChild(tickMark)
    li.appendChild(taskDesc)
    li.appendChild(crossMark)

    taskList.appendChild(li)
    addTaskInput.value = ""
    // all these are bad practices. change this
    checkTickIcon()
    checkCrossIcon()
    getTaskDescription()
    hideClearAllButton()
    saveData()
}

// ----------------------------------------------------------------------------------------------
// mark tasks as complete
function checkTickIcon(){
    const tickIcon = document.querySelectorAll("i.tick") 

    for(let i = 0; i < tickIcon.length; i++){
        // check if the icon already has the same event listener
        if(!tickIcon[i].getAttribute('data-listener')){
            tickIcon[i].addEventListener('click', markAsComplete)
            tickIcon[i].setAttribute('data-listener', 'true')
        }
    }
}
function markAsComplete(event){
    let li = event.target.parentElement
    let span = li.querySelector("span")

    // check if it is completed previously or not
    if(span.classList.contains("completed")){
        span.classList.remove("completed")

        li.firstChild.remove()
        let tickMark = document.createElement("i")
        tickMark.classList.add("fa-regular", "fa-circle-check", "tick")
        li.insertBefore(tickMark, li.firstChild)
    }
    else{
        span.classList.add("completed")

        li.firstChild.remove()
        let tickMark = document.createElement("i")
        tickMark.classList.add("fa-solid", "fa-circle-check", "tick") 
        li.insertBefore(tickMark, li.firstChild)
    }
    checkTickIcon()  
    saveData()
    return    
}
// ----------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------
// remove tasks
function checkCrossIcon(){
    const crossIcon = document.querySelectorAll("i.cross") 
    for(let i = 0; i < crossIcon.length; i++){
        if(!crossIcon[i].getAttribute('data-listener')){
            crossIcon[i].addEventListener('click', removeTask)
            crossIcon[i].setAttribute('data-listener', 'true')
        }
    }
}
function removeTask(event){
    let li = event.target.parentElement
    li.remove() 
    hideClearAllButton()
    saveData()  
}
// ----------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------
//edit the tasks
function getTaskDescription(){
    const taskDescAll = document.querySelectorAll("li span")
    for(let i = 0; i < taskDescAll.length; i++){
        taskDescAll[i].addEventListener('click', editTaskDesc)
    }
}
function editTaskDesc(event){
    let span = event.target
    if(span.classList.contains("completed")){
        return
    }
    let spanContent = span.textContent
    span.textContent = ""
    let li = span.parentElement
    let inputDesc = document.createElement("input")
    inputDesc.type = "text" 
    // inputDesc.placeholder = spanContent
    inputDesc.value = spanContent
    li.insertBefore(inputDesc, li.lastChild)
    inputDesc.onblur = () => {
        if(inputDesc.value != ""){
            span.textContent = inputDesc.value
        }
        else{
            span.textContent = spanContent
        }
        inputDesc.remove() 
        return
    }

    // saveData()
}
// ----------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------
// delete all tasks onclick the `Clear all` button
function deleteAllTasks(){
    let result = window.confirm("Do you want to delete all tasks?")
    if(result === true){ 
        for(let i = taskList.children.length - 1; i >= 0; --i){
            taskList.children[i].remove()
        }
    }
    else{
        console.log("clicked on cancel");    
    }
    hideClearAllButton()
    saveData() 
}
// ----------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------
// hide the `Clear all` button when there are no tasks in the ul
document.addEventListener("DOMContentLoaded", hideClearAllButton)

function hideClearAllButton(){

    if(taskList.children.length === 0){
        let buttonContainer = document.querySelector("div.buttonContainer")
        let filterContainer = document.querySelector("div.filterContainer")
        buttonContainer.style.display = "none"
        filterContainer.style.display = "none"
    }
    else{
        let buttonContainer = document.querySelector("div.buttonContainer")
        let filterContainer = document.querySelector("div.filterContainer")
        buttonContainer.style.display = "flex"
        filterContainer.style.display = "flex"
    }
    return
}

// ----------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------
// filter tasks by completion status
const filterAll= document.getElementById("filterAll")
const filterCompleted = document.getElementById("filterCompleted")
const filterTodo = document.getElementById("filterTodo")


filterAll.addEventListener('click', () => filterTasks("all"))
filterCompleted.addEventListener('click', () => filterTasks('completed'))
filterTodo.addEventListener('click', () => filterTasks('todo'))

function filterTasks(filter){
    const tasks = document.querySelectorAll("li.newTask")

    tasks.forEach(task =>{
        if(filter === 'all'){
            task.style.display = "flex"
        }
        else if (filter === 'completed'){
            if(task.querySelector('span').classList.contains('completed')){
                task.style.display = 'flex'
            }
            else{
                task.style.display = 'none'
            }
        }
        else if(filter === 'todo'){
            if(!task.querySelector('span').classList.contains('completed')){
                task.style.display = 'flex'
            }
            else{
                task.style.display = 'none'
            }
        }
    })
}

// ----------------------------------------------------------------------------------------------



// ----------------------------------------------------------------------------------------------
// add all the tasks in the localStorage so that they will persist
function saveData(){
    localStorage.setItem("data", taskList.innerHTML)
}

function showTask(){ 
    // check if the data exists or not
    const savedData =  localStorage.getItem("data")

    if(savedData){
        taskList.innerHTML = savedData 
    }
}
showTask()
// ----------------------------------------------------------------------------------------------
