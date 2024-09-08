let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let ArrayOfTasks = [];

//Check if there's Tasks in local Storage
if (localStorage.getItem("tasks")) {
    ArrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
//Trigger Get Data from Local Storage
getDataFromLocalStorage();

//Add Event Listener to Submit Button
submit.onclick = function() {
    if (input.value !== '') {
        addTaskToArray(input.value);
        input.value = '';
    }
}

tasksDiv.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete')){
        //remove element from page
        e.target.parentElement.remove();
        //remove task from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"))

    }
    if(e.target.classList.contains("task")){
        //toggle completed from the task 
        toggleStatusTaskWith(e.target.parentElement.getAttribute("data-id"))

        //toggle done class
        e.target.classList.toggle("done");
    }
})

function addTaskToArray(value) {
    // Task Data
    const task = {
        id: Date.now(),
        title: value,
        completed: false
    };
    // Push task to Array of Tasks
    ArrayOfTasks.push(task);
    // Add Tasks to Page
    addElementsTopageFrom(ArrayOfTasks);
    // Add Tasks to Local Storage
    addDataToLocalStorageFrom(ArrayOfTasks);
}

function addElementsTopageFrom(ArrayOfTasks) {
    // Clear the tasks div
    tasksDiv.innerHTML = '';
    ArrayOfTasks.forEach((task) => {  
        // Create a new div for each task
        let div = document.createElement("div");
        div.className = "task";
        // Check if task is done
        if (task.completed) {
            div.classList.add("done");
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));

        // Create Delete Button
        let span = document.createElement("span");
        span.className = "delete";
        span.appendChild(document.createTextNode("Delete"));
        // Append Delete Button to div
        div.appendChild(span);
        // Append task Div to parent tasks div
        tasksDiv.appendChild(div);
    });
}

// Function to add the value to the localStorage
function addDataToLocalStorageFrom(ArrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(ArrayOfTasks)); // استخدم "tasks" لتوحيد المفتاح
}

// Function to get data from localStorage
function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks"); // استخدم "tasks" لتوحيد المفتاح
    if (data) {
        ArrayOfTasks = JSON.parse(data);
        addElementsTopageFrom(ArrayOfTasks); // عرض المهام بعد استرجاعها
    }
}

function deleteTaskWith(taskId){
    ArrayOfTasks=ArrayOfTasks.filter((task)=>task.id!=taskId)
    addDataToLocalStorageFrom(ArrayOfTasks)
}

function toggleStatusTaskWith(taskId){
 for(let i=0;i<ArrayOfTasks.length;i++){
    if(ArrayOfTasks[i].id==taskId){
        ArrayOfTasks[i].completed==false?(ArrayOfTasks[i].completed==true):(ArrayOfTasks[i].completed==false)
}
}
addDataToLocalStorageFrom(ArrayOfTasks)
}