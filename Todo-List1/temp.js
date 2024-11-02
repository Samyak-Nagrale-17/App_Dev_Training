const addButton = document.querySelector("#add")
const taskWrapper = document.querySelector(".wrapper")

let taskArray = []

addButton.addEventListener('click', addNewTask)

function generateTaskId(){
    return new Date().getTime()
}

function addNewTask() {
    let newTask = document.createElement("p")
    newTask.classList.add("task")

    const newTaskId = generateTaskId()
    newTask.textContent =
    newTask.setAttribute("taskID", newTaskId)

    let newTaskObject = {
        taskId : newTaskId
    }

    console.log(newTask)
    taskWrapper.appendChild(newTask)
    taskArray.push(newTaskObject)
    // update it once
    // showData()
}
