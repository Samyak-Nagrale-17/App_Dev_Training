const addTaskButton = document.getElementById("addTaskButton")
const addTaskInput = document.getElementById("addTaskInput")
const taskList = document.querySelector("ul.taskList")
const clearAllButton = document.getElementById("deleteAllTasks")

// add new task
function addNewTask() {
   const taskDesc = addTaskInput.value.trim()
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
   taskList.appendChild(li)
   //clear the input feild
   addTaskInput.value = ""
   // display filter and clear all as non-zero tasks
   toggleClearAllButton()
   saveData()
}

// ul.taskList onclick
// separate out the function dont write arrow function
taskList.addEventListener("click", function (event) {
   const target = event.target
   const li = target.closest("li")
   // if li exists or not
   if (!li) {return}
   if (target.classList.contains("tick")) {
       toggleTaskComplete(li)
   } else if (target.classList.contains("cross")) {
       removeTask(li)
       //}else if(target.tagNae === "span"){ 
   } else if (target.tagName === "SPAN") {
       editTaskDescription(li)
   }
})   

// toggle task as complete
function toggleTaskComplete(li) {
   const span = li.querySelector("span.taskDesc")
   if (span.classList.contains("completed")) {
       span.classList.remove("completed")
       li.querySelector(".tick").classList.replace("fa-solid", "fa-regular")
   } else {
       span.classList.add("completed")
       li.querySelector(".tick").classList.replace("fa-regular", "fa-solid")
   }
   saveData()
}

//delete clicked task
function removeTask(li) {
   li.remove()
   toggleClearAllButton()
   saveData()
}

// function removeTask(li){
//     console.log(li.parentElement)
//     li.parentElement.remove()
//     return
// }


// edit task description. completed tasks cannot be edited
function editTaskDescription(li) {
   const span = li.querySelector("span.taskDesc")
   if (span.classList.contains("completed")) {return} 
   const currentDesc = span.textContent
   const input = document.createElement("input")
   input.type = "text"
   input.value = currentDesc
   li.insertBefore(input, span)
   span.remove()
   input.addEventListener("blur", function () {
       const newDesc = input.value.trim() || currentDesc
       span.textContent = newDesc
       li.insertBefore(span, input)
       input.remove()
       saveData()
   })
   //autofocus the input field
   input.focus()
}

// clear all tasks onclick clearallbutton
clearAllButton.addEventListener("click", function () {
   if (confirm("Are you sure you want to delete all tasks?")) {
       taskList.innerHTML = ""
       toggleClearAllButton()
       saveData()
   }
})

// toggle clear all button
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
        // clearAllButton.style.display = "block"
        buttonContainer.style.display = "flex"
        filterContainer.style.display = "flex"
   }
   return
}

// filter tasks: all, completed, todo
const filterAll = document.getElementById("filterAll")
const filterCompleted = document.getElementById("filterCompleted")
const filterTodo = document.getElementById("filterTodo")
filterAll.addEventListener("click", () => filterTasks("all"))
filterCompleted.addEventListener("click", () => filterTasks("completed"))
filterTodo.addEventListener("click", () => filterTasks("todo"))
function filterTasks(filter) {
   const tasks = document.querySelectorAll("li.newTask")
   tasks.forEach(task => {
       const isCompleted = task.querySelector("span").classList.contains("completed")

        if(filter === "all"){
            task.style.display = "flex"
            // filterAll.classList.toggle("currentFilter")
            // filterAll.onblur = () => filterAll.classList.toggle("currentFilter")
        }
        else if(filter === "completed" && isCompleted){
            task.style.display = "flex"
            // filterCompleted.classList.toggle("currentFilter")
            // filterCompleted.onblur = () => filterCompleted.classList.toggle("currentFilter")
        }
        else if(filter === "todo" && !isCompleted){
            task.style.display = "flex"
            // filterTodo.classList.toggle("currentFilter")
            // filterTodo.onblur = () => filterTodo.classList.toggle("currentFilter")
        }

        //all                  // completed                                 //todo
    //    if (filter === "all" || (filter === "completed" && isCompleted) || (filter === "todo" && !isCompleted)) {
    //        task.style.display = "flex"
    //    } else {
    //        task.style.display = "none"
    //    }
   })

}

// save and load tasks from localStorage save entire content of ul
function saveData() {
   localStorage.setItem("data", taskList.innerHTML)
}

function showTask() {
   const savedData = localStorage.getItem("data")
   if (savedData) {
       taskList.innerHTML = savedData
       toggleClearAllButton()
   }
}
document.addEventListener("DOMContentLoaded", showTask)
// document.addEventListener("DOMContentLoaded",toggleTaskComplete)
// document.addEventListener("DOMContentLoaded",removeTask)
// document.addEventListener("DOMContentLoaded",toggleClearAllButton)
// filter and clear all visible even when no tasks are there
document.addEventListener("DOMContentLoaded",toggleClearAllButton)
