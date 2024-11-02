let taskObject = {
  taskId: 0,
  taskDesc: 'task 2 which needs to be edited',
  isCompleted: false,
};

let myArray = [];
myArray.push(taskObject);
console.log(myArray[0]);
let newDesc = 'this was edited';
let tempObj = myArray[0]
tempObj.taskDesc = newDesc
console.log(myArray[0]);
