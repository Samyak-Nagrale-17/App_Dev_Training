// Select main elements
const addTaskButton = document.getElementById("addTaskButton");
const addTaskInput = document.getElementById("addTaskInput");
const taskList = document.querySelector("ul.taskList");
const clearAllButton = document.getElementById("deleteAllTasks");
// Add new task
function addNewTask() {
   const taskDesc = addTaskInput.value.trim();
   if (taskDesc === "") {
       alert("Cannot add an empty task");
       return;
   }
   const li = document.createElement("li");
   li.classList.add("newTask");
   // Add the task description and icons
   li.innerHTML = `
<i class="fa-regular fa-circle-check tick"></i>
<span class="taskDesc">${taskDesc}</span>
<i class="fa-regular fa-circle-xmark cross"></i>
   `;
   taskList.appendChild(li);
   addTaskInput.value = "";
   toggleClearAllButton();
   saveData();
}
// Event Delegation: Handle clicks on taskList (for tick and cross icons)
taskList.addEventListener("click", function (event) {
   const target = event.target;
   const li = target.closest("li");
   if (!li) return; // If click is not on a task item, ignore
   if (target.classList.contains("tick")) {
       toggleTaskComplete(li);
   } else if (target.classList.contains("cross")) {
       removeTask(li);
   } else if (target.tagName === "SPAN") {
       editTaskDescription(li);
   }
});
// Mark task as complete or incomplete
function toggleTaskComplete(li) {
   const span = li.querySelector("span.taskDesc");
   if (span.classList.contains("completed")) {
       span.classList.remove("completed");
       li.querySelector(".tick").classList.replace("fa-solid", "fa-regular");
   } else {
       span.classList.add("completed");
       li.querySelector(".tick").classList.replace("fa-regular", "fa-solid");
   }
   saveData();
}
// Remove task
function removeTask(li) {
   li.remove();
   toggleClearAllButton();
   saveData();
}
// Edit task description
function editTaskDescription(li) {
   const span = li.querySelector("span.taskDesc");
   if (span.classList.contains("completed")) return; // Prevent editing completed tasks
   const currentDesc = span.textContent;
   const input = document.createElement("input");
   input.type = "text";
   input.value = currentDesc;
   li.insertBefore(input, span);
   span.remove();
   input.addEventListener("blur", function () {
       const newDesc = input.value.trim() || currentDesc;
       span.textContent = newDesc;
       li.insertBefore(span, input);
       input.remove();
       saveData();
   });
   input.focus();
}
// Clear all tasks
clearAllButton.addEventListener("click", function () {
   if (confirm("Are you sure you want to delete all tasks?")) {
       taskList.innerHTML = "";
       toggleClearAllButton();
       saveData();
   }
});
// Show or hide Clear All button
function toggleClearAllButton() {
   clearAllButton.style.display = taskList.children.length ? "block" : "none";
}
// Filter tasks
const filterAll = document.getElementById("filterAll");
const filterCompleted = document.getElementById("filterCompleted");
const filterTodo = document.getElementById("filterTodo");
filterAll.addEventListener("click", () => filterTasks("all"));
filterCompleted.addEventListener("click", () => filterTasks("completed"));
filterTodo.addEventListener("click", () => filterTasks("todo"));
function filterTasks(filter) {
   const tasks = document.querySelectorAll("li.newTask");
   tasks.forEach(task => {
       const isCompleted = task.querySelector("span").classList.contains("completed");
       if (filter === "all" || (filter === "completed" && isCompleted) || (filter === "todo" && !isCompleted)) {
           task.style.display = "flex";
       } else {
           task.style.display = "none";
       }
   });
}
// Save and load tasks from localStorage
function saveData() {
   localStorage.setItem("data", taskList.innerHTML);
}
function showTask() {
   const savedData = localStorage.getItem("data");
   if (savedData) {
       taskList.innerHTML = savedData;
       toggleClearAllButton();
   }
}
document.addEventListener("DOMContentLoaded", showTask);
