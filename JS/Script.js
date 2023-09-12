let updatedTask;

document.addEventListener("DOMContentLoaded", function () {
  function getAllTasksFromStorage() {
    var tasks = [];

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var taskJSON = localStorage.getItem(key);

      var task = JSON.parse(taskJSON);
      tasks.push(task);
    }
    return tasks;
  }

  function addTasksFromStorage(tasks) {
    tasks.forEach((task) => {
      var newTask = document.createElement("div");
      newTask.classList.add("task");
      var button = "Completed";
      var textClass = "taskText";

      if (task["completed"]) {
        button = "Uncomplete";
        textClass += " completed";
      }

      newTask.innerHTML = `
      <span class="${textClass}">${task["task"]}</span>
      <button class="button delete" onclick="Delete(this)" type="button">Delete</button>
      <button class="button" onclick="Complete(this)" type="button">${button}</button>
      <button class="button" onclick="Edit(this)" type="button">Edit</button>
    `;
      var list = document.getElementById("toDoList");
      list.append(newTask);
    });
  }

  addTasksFromStorage(getAllTasksFromStorage());
});

function addTaskIntoStorage(taskText) {
  var Task = {
    task: taskText,
    completed: false,
  };
  localStorage.setItem(taskText, JSON.stringify(Task));
}

function removeTaskFromStorage(taskText) {
  localStorage.removeItem(taskText);
}

function updateTaskInStorage(Complete, task) {
  let updatedTask = JSON.parse(localStorage.getItem(task));
  updatedTask["completed"] = Complete;
  localStorage.setItem(task, JSON.stringify(updatedTask));
}

function taskFound(taskText) {
  let task = null;
  task = localStorage.getItem(taskText);

  if (task != null) {
    return true;
  }

  return false;
}

function addTask() {
  let taskText;
  var str = document.getElementById("inputText");
  taskText = str.value;
  if (str.value != "") {
    if (taskFound(str.value)) {
      swal({
        icon: "error",
        title: "Oops...",
        text: "This task is already exist!",
      });
      return;
    }
    var newTask = document.createElement("div");
    newTask.classList.add("task");

    newTask.innerHTML = `
      <span class="taskText">${str.value}</span>
      <button class="button delete" onclick="Delete(this)" type="button">Delete</button>
      <button class="button" onclick="Complete(this)" type="button">Completed</button>
      <button class="button" onclick="Edit(this)" type="button">Edit</button>
    `;

    str.value = "";
    var list = document.getElementById("toDoList");
    list.append(newTask);
  } else {
    swal({
      icon: "error",
      title: "Oops...",
      text: "You should write the task!",
    });
    return;
  }
  addTaskIntoStorage(taskText);
}

function Delete(button) {
  var parent = button.parentNode;
  var text = button.parentNode.firstElementChild.textContent;
  parent.remove();

  removeTaskFromStorage(text);
}

function Complete(button) {
  let child = button.parentNode.firstElementChild;

  if (button.textContent == "Completed") {
    button.textContent = "Uncomplete";
    updateTaskInStorage(true, child.textContent);
  } else {
    button.textContent = "Completed";
    updateTaskInStorage(false, child.textContent);
  }
  child.classList.toggle("completed");
}

function reset(newText) {
  updatedTask.textContent = newText;

  let input = document.getElementById("inputText");
  let btn = document.getElementsByClassName("buttonAdd")[0];

  btn.setAttribute("onclick", "addTask()");
  btn.textContent = "Add Task";
  input.focus();
  input.setAttribute("onkeypress", "checkIfEnter(event)");
  input.value = "";
}

function updateTask() {
  let input = document.getElementById("inputText");
  var str = input.value;

  let newTask = JSON.parse(localStorage.getItem(updatedTask.textContent));
  newTask["task"] = str;

  localStorage.removeItem(updatedTask.textContent);
  localStorage.setItem(newTask["task"], JSON.stringify(newTask));

  reset(input.value);
}

function checkToUpdate(event) {
  if (event.key == "Enter") {
    updateTask();
  }
}

function Edit(button) {
  let input = document.getElementById("inputText");
  let btn = document.getElementsByClassName("buttonAdd")[0];
  updatedTask = button.parentNode.firstElementChild;

  btn.setAttribute("onclick", "updateTask()");
  btn.textContent = "Update Task";
  input.focus();
  input.value = updatedTask.textContent;
  input.setAttribute("onkeypress", "checkToUpdate(event)");
}

function checkIfEnter(event) {
  if (event.key == "Enter") {
    addTask();
  }
}
