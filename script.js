var input = document.getElementById('taskInput')
filters = document.querySelectorAll(".labels span");
deleteAll = document.querySelector(".deleteAllBtn");
taskContainer = document.querySelector(".taskContainer");
add=document.querySelector('.addBtn');



var currentDate = new Date().toDateString();
document.querySelector(".date").innerText =currentDate;

let editId;
let isEdited = false;

//getting list from localstorage
let todos = JSON.parse(localStorage.getItem("todoList"));


if(todos)
   {
       //refresh task list every day
for (var i = 0; i < todos.length; i++) {
    if (todos[i].taskDate == currentDate) {
        displayTodo("all");
    } else {
        todos.splice(i);
    }
}
localStorage.setItem("todoList", JSON.stringify(todos));
displayTodo("all");
   }
   







filters.forEach(btn => {
    //on click it will remove the active for present label and add it to clicked label
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        displayTodo(btn.id);
    });
});


//function to display task list
function displayTodo(label) {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            //setting iscompleted value to checked, if the todo status is completed
            let isCompleted = todo.status == "completed" ? "checked" : "";
            
            if (label == todo.status || label == "all") {
                li += `<li class="taskList">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                        <p class="${isCompleted}">${todo.name}</p>
                    </label>
                    <div class="actions">
                        <button onclick="editTask(${id}, '${todo.name}')" name="edit" class="${isCompleted}" id="edit" >Edit</button>
                        <button onclick="deleteTask(${id})" name="delete"  id="delete">Delete</button>
                    </div>
                </li >`;
                
            }
            
            
        });
        
        
    }
    //if list isn't empty show list of items else show span
    taskContainer.innerHTML = li || `<span><b>You don't have any works here</b></span> `;
}
displayTodo("all");



//function to update the task status
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        //marking the status of selected task as completed
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        //marking the status of selected task as pending
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todoList", JSON.stringify(todos));
}

//function to edit the task
function editTask(Id, Name) {
    editId = Id;
    isEdited = true;
    input.value = Name;
}

//function to delete the task
function deleteTask(deleteTask) {
    //remove selected task from todos array
    todos.splice(deleteTask, 1);
    localStorage.setItem("todoList", JSON.stringify(todos));
    displayTodo("all");
}

//delete all tasks by clicking delete all btn
deleteAll.addEventListener("click", () => {
    //removing all items of todo array
    todos.splice(0, todos.length);
    localStorage.setItem("todoList", JSON.stringify(todos));
    displayTodo("all");
});




//add task to the taskList and local storage  
input.addEventListener('keyup', (e) => {
    let task = input.value.trim();
    if (e.key=="Enter" && task) {
        if (!isEdited) {
            if (!todos) { //if there is no todos, empty array is assigned to todos
                todos = [];
            }
            let taskInfo = { name: task, status: "pending", taskDate: new Date().toDateString() };
            todos.push(taskInfo);//adding new task to todos
        } else {
            isEdited = false;
            todos[editId].name = task;
        }
        input.value = "";
        localStorage.setItem("todoList", JSON.stringify(todos));//json.stringify is to convert data to string  to store it on localstorage
    
        displayTodo("all");
    }
});
