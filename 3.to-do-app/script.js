const form = document.querySelector(".input-form");
const ul = document.querySelector(".task-list");

function renderTask(task) {
  let li = document.createElement("li");
  li.classList.add("task-item");
  li.setAttribute("data-id", String(task.id));

  const startDiv = document.createElement("div");
  startDiv.classList.add("start-container");

  const statusContainer = document.createElement("div");
  statusContainer.classList.add("task-status-container");

  const statusInput = document.createElement("input");
  statusInput.type = "checkbox";
  statusInput.name = "status";
  statusInput.id = "status";
  statusInput.checked = !task.active;
  statusInput.classList.add("status-input");

  statusContainer.appendChild(statusInput);

  const taskNameDiv = document.createElement("div");
  taskNameDiv.classList.add("task-name-container");

  const taskNameP = document.createElement("p");
  taskNameP.classList.add("task-name");

  if (!task.active) {
    // if task is completed.
    targetTaskName.classList.add("completed");
  }

  taskNameDiv.append(taskNameP);

  startDiv.append(statusContainer);
  startDiv.append(taskNameDiv);

  const endDiv = document.createElement("div");
  endDiv.classList.add("end-container");

  const taskDeadlineDiv = document.createElement("div");
  taskDeadlineDiv.classList.add("task-deadline");

  const editTaskBtn = document.createElement("button");
  editTaskBtn.classList.add("edit-task-btn");
  editTaskBtn.textContent = "Edit";

  const deleteTaskBtn = document.createElement("button");
  deleteTaskBtn.classList.add("delete-task-btn");
  deleteTaskBtn.textContent = "X";

  endDiv.append(taskDeadlineDiv);
  endDiv.append(editTaskBtn);
  endDiv.append(deleteTaskBtn);

  taskNameP.textContent = task.name;
  taskDeadlineDiv.textContent = task.deadline;

  li.append(startDiv, endDiv);
  return li;
}

document.addEventListener("DOMContentLoaded", function (e) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = tasks || [];

  tasks.forEach((el) => {
    const li = renderTask(el);
    ul.append(li);
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const targetTaskId = form.elements.taskId.value;
  const taskName = form.elements.taskname.value;
  const taskDeadline = form.elements.deadline.value;
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks = tasks || [];

  const taskIdx = targetTaskId
    ? tasks.findIndex((el) => el.id === Number(targetTaskId))
    : -1;

  if (taskIdx !== -1) {
    // edit existing task.
    tasks = tasks.map((el) => {
      return el.id === Number(targetTaskId)
        ? { ...el, name: taskName, deadline: taskDeadline }
        : el;
    });

    // Modify changes immediately for DOM (after edit) for a stateful reaction.
    const li = document.querySelector(`[data-id="${targetTaskId}"]`);
    let nameDiv = li.querySelector(".task-name");
    let deadlineDiv = li.querySelector(".task-deadline");

    nameDiv.textContent = taskName;
    deadlineDiv.textContent = taskDeadline;
  } else {
    // create new task.
    const newTask = {
      id: Date.now(),
      active: true,
      name: taskName,
      deadline: taskDeadline,
    };
    tasks.push(newTask);

    // create  HTML elements
    const li = renderTask(newTask);

    ul.append(li);
  }

  // save changes to localStorage.
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // reset form fields
  form.elements.taskId.value = "";
  form.elements.taskname.value = "";
  form.elements.deadline.value = "";
});

ul.addEventListener("click", function (e) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  if (e.target.classList.contains("delete-task-btn")) {
    let removeIt = e.target.closest(".task-item").getAttribute("data-id");
    tasks = tasks.filter((el) => el.id !== Number(removeIt));

    e.target.closest(".task-item").remove();
  } else if (e.target.classList.contains("edit-task-btn")) {
    const targetTaskId = e.target.closest(".task-item").getAttribute("data-id");

    const task = tasks.find((el) => el.id === Number(targetTaskId));
    form.elements.taskId.value = targetTaskId;
    form.elements.taskname.value = task.name;
    form.elements.deadline.value = task.deadline;
  } else if (e.target.classList.contains("status-input")) {
    const targetItemId = e.target.closest(".task-item").getAttribute("data-id");
    const id = Number(targetItemId);

    const taskIdx = tasks.findIndex((el) => el.id === id);

    if (taskIdx !== -1) {
      tasks[taskIdx].active = !tasks[taskIdx].active;
    }

    const taskItem = e.target.closest(".task-item");
    const targetTaskName = taskItem.querySelector(".task-name");

    targetTaskName.classList.toggle("completed", e.target.checked);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
});
