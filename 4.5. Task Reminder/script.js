const form = document.getElementById("input-form");
const tListContainer = document.getElementById("task-list");
const startBtn = document.getElementsByClassName("start-btn");
const pauseBtn = document.getElementsByClassName("pause-btn");
const cancelBtn = document.getElementsByClassName("cancel-btn");

function displayExistingTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    let newTaskEl = createTaskEl(task);
    tListContainer.append(newTaskEl);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  displayExistingTasks();
});

function createTaskEl(taskObj) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.dataset.taskId = taskObj.id;

  const tNameDiv = document.createElement("div");
  tNameDiv.classList.add("task-name");
  tNameDiv.textContent = taskObj.name;

  const tTimerDiv = document.createElement("div");
  tTimerDiv.classList.add("task-timer");
  tTimerDiv.textContent = taskObj.duration;

  const startBtn = document.createElement("button");
  startBtn.classList.add("start-btn");
  startBtn.textContent = "START";

  const pauseBtn = document.createElement("button");
  pauseBtn.classList.add("pause-btn");
  pauseBtn.textContent = "❚❚";

  const resumeBtn = document.createElement("button");
  resumeBtn.classList.add("resume-btn");
  resumeBtn.textContent = "▷";

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("cancel-btn");
  cancelBtn.textContent = "🗙";

  li.append(tNameDiv, tTimerDiv, startBtn, pauseBtn, resumeBtn, cancelBtn);

  return li;
}

function retrieveTaskEl(taskObj) {
  const targettaskEl = tListContainer.querySelector(
    `li[data-task-id="${taskObj.id}"]`
  );

  return targettaskEl;
}

function startCountdown(taskObj) {
  const removeTaskEl = tListContainer.querySelector(
    `li[data-task-id="${taskObj.id}"]`
  );
  const timerEl = removeTaskEl.querySelector(".task-timer");

  let countdown = taskObj.duration;

  let intervalId = setInterval(() => {
    console.log(countdown / 1000);

    if (countdown <= 0) {
      clearInterval(intervalId);
      taskObj.intervalId = null;

      alert(`Out of time for task : "${taskObj.name}".`);

      removeTaskEl.remove();
      removeTask(taskObj);
      return intervalId;
    }

    timerEl.textContent = countdown / 1000;
    countdown -= 1000;
  }, 1000);

  taskObj.intervalId = intervalId;
  saveTask(taskObj);

  // return intervalId;
}

function findTaskFromStorage(taskId) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  return tasks.find((el) => String(el.id) === String(taskId));
}

function pauseCountdown(taskObj) {
  const timerEl = tListContainer
    .querySelector(`[data-task-id="${taskObj.id}"]`)
    .querySelector(".task-timer");

  clearInterval(taskObj.intervalId);

  console.log("during pause, taskObj:", taskObj);
  taskObj.intervalId = null;
  taskObj.duration = Number(timerEl.textContent) * 1000;
  console.log("taskObj's duraiton", taskObj.duration);

  saveTask(taskObj);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const existingIdx = tasks.findIndex(
    (el) => String(el.id) === String(task.id)
  );

  if (existingIdx !== -1) {
    tasks[existingIdx] = task;
  } else {
    tasks.push(task);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(taskObj) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.filter((el) => String(el.id) !== String(taskObj.id));

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const tName = document.getElementById("name").value;
  const hours = document.getElementById("hours").value || 0;
  const mins = document.getElementById("mins").value || 0;
  const secs = document.getElementById("secs").value || 0;

  const duration =
    (Number(hours) * 3600 + Number(mins) * 60 + Number(secs)) * 1000;

  const newTaskObj = {
    id: crypto.randomUUID(),
    name: tName,
    duration: duration,
    status: "idle",
    intervalId: null,
  };

  const newTaskEl = createTaskEl(newTaskObj);
  saveTask(newTaskObj);

  const tTimerDiv = newTaskEl.querySelector(".task-timer");
  tTimerDiv.textContent = duration / 1000;
  tListContainer.append(newTaskEl);

  // let intervalId = startCountdown(tName, newTaskEl, tTimerDiv, duration);
});

tListContainer.addEventListener("click", function (e) {
  const targetTaskId =
    e.target.closest("li").getAttribute("data-task-id") || null;
  const taskObj = findTaskFromStorage(targetTaskId);

  if (e.target.classList.contains("start-btn")) {
    let intervalId = startCountdown(taskObj);
  } else if (e.target.classList.contains("pause-btn")) {
    let iid = taskObj.intervalId;
    // const taskObj = findTaskFromStorage(targetId);
    pauseCountdown(taskObj);
  } else if (e.target.classList.contains("resume-btn")) {
    console.log(taskObj);
    startCountdown(taskObj);
  } else if (e.target.classList.contains("cancel-btn")) {
    clearInterval(taskObj.intervalId);
    taskObj.intervalId = null;
    const taskEl = retrieveTaskEl(taskObj);
    taskEl.remove();
    removeTask(taskObj);
  }
});
