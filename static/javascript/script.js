const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {

    document.addEventListener("DOMContentLoaded", getTasks);

    form.addEventListener("submit", addTask);

    //taskList.addEventListener("click", removeTask);

    clearBtn.addEventListener("click", clearTasks);
}

function getTasks() {
    let tasks;
    //let dones;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    // if (localStorage.getItem("done") === null) {
    //     dones = [];
    // }
    // else {
    //     dones = JSON.parse(localStorage.getItem("done"));
    // }

    //console.log(tasks);

    for (task in tasks) {
        const li = document.createElement("li");

        li.className = "collection-item";

        li.appendChild(document.createTextNode(tasks[task]));

        const removeBtn = document.createElement("a");

        removeBtn.className = "delete-item";

        removeBtn.innerHTML = "X";

        li.appendChild(removeBtn);

        // const doneBtn = document.createElement("a");

        // doneBtn.className = "done-item";

        // doneBtn.innerHTML = "✔";

        // li.appendChild(doneBtn);

        taskList.appendChild(li);

        removeBtn.addEventListener("click", removeTask);

        function removeTask(e) {
            li.classList.add("deleted");

            removeTaskFromLocalStorage(e.target.parentElement);
        }

        // doneBtn.addEventListener("click", doneTask);

        // function doneTask() {
        //     doneBtn.classList.toggle("done");
        // }
    }

    checkTaskList();
}

function addTask(e) {
    if (taskInput.value === "") {
        alert("لطفا ورودی را پر کنید...");
        return;
    }

    const li = document.createElement("li");

    li.appendChild(document.createTextNode(taskInput.value));

    const removeBtn = document.createElement("a");

    removeBtn.className = "delete-item";

    removeBtn.innerHTML = "X";

    li.appendChild(removeBtn);

    // const doneBtn = document.createElement("a");

    // doneBtn.className = "done-item";

    // doneBtn.innerHTML = "✔";

    // li.appendChild(doneBtn);

    taskList.appendChild(li);

    removeBtn.addEventListener("click", removeTask);

    function removeTask(e) {
        li.classList.add("deleted");

        removeTaskFromLocalStorage(e.target.parentElement);
    }

    // doneBtn.addEventListener("click", doneTask);

    // function doneTask() {
    //     doneBtn.classList.toggle("done");
    // }

    addTaskInLocalStorage(taskInput.value);

    taskInput.value = "";

    e.preventDefault();

    checkTaskList();
}

function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTaskFromLocalStorage();
}

function addTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    checkTaskList();
}

function clearTaskFromLocalStorage() {
    localStorage.clear();

    checkTaskList();
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task + "X") {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function checkTaskList() {
    if (taskList.innerHTML != "") {
        taskList.style.display = "block";
    }
    else {
        taskList.style.display = "none";
    }
}

checkTaskList();