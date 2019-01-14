// Define UI vars

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-task");
const taskList = document.querySelector(".collection");

//call loadEventListeners()
loadEventListeners();

//Load event listeners

function loadEventListeners(){

  //Add task event
  form.addEventListener("submit", addTask);

  //Get tasks from LS
  document.addEventListener("DOMContentLoaded", getTasks);

  //Remove task event
  taskList.addEventListener("click", RemoveTask);

  //Clear task
  clearBtn.addEventListener("click", clearTask);

  //Filter task

  filter.addEventListener("keyup", filterTask);
}

function getTasks(){

  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task){
    const li = document.createElement("li");
    li.className = "collection-item";
    const textNode = document.createTextNode(task);
    li.appendChild(textNode);
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    li.appendChild(link);
    taskList.appendChild(li);
  })

}

function filterTask(e){
  const text = e.target.value.toLowerCase();
  const tasks = document.querySelectorAll(".collection-item");
  tasks.forEach(function(task){
    if(task.firstChild.textContent.toLocaleLowerCase().indexOf(text) != -1){
      task.style.display = "block";
    }else{
      task.style.display = "none";
    }
  })
  
}

function clearTask(){

  if(confirm("You will clear these task")){
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  } 
  clearTaskFromLocalStorage();
  //taskList.innerHTML = "";
}

function clearTaskFromLocalStorage(){
  localStorage.clear();
}

function RemoveTask(e){
  if(e.target.parentElement.classList.contains("delete-item")){
    if(confirm("Are you sure you want to delete this item")){
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem){
  console.log(taskItem);
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    console.log(localStorage.getItem("tasks"));
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  })

  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function addTask(e){
  if (taskInput.value===""){
  alert("Add a task");
  }else{
    const li = document.createElement("li");
    li.className = "collection-item";
    const textNode = document.createTextNode(taskInput.value);
    li.appendChild(textNode);
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    li.appendChild(link);
    taskList.appendChild(li);

    //store task LS
     
    storeTaskInLocalStorage(taskInput.value);

    alert("New Task Added");
    taskInput.value = "";
    
  }
  e.preventDefault();
}

function storeTaskInLocalStorage(task){
  let tasks ;
  if(localStorage.getItem("tasks")==null){
    console.log(localStorage.getItem("tasks"));
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

