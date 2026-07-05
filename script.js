let tasks = [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const doneCounter = document.getElementById("doneCounter");
const msg = document.getElementById("msg");

// R1 + R5 + B2
function addTask() {
  let text = taskInput.value.trim();

  if (text === "") {
    msg.innerText = "Please type a task first";
    return;
  }

  // B2 - prevent duplicates
  if (tasks.some(t => t.text.toLowerCase() === text.toLowerCase())) {
    msg.innerText = "This task already exists!";
    return;
  }

  msg.innerText = "";

  tasks.push({ text: text, done: false });

  taskInput.value = "";

  render();
}

// R2 + R3 + R5
function render() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.done ? "done" : ""}" onclick="toggleTask(${index})">
        ${task.text}
      </span>

      <div>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateCounters();
}

// R2 - mark done toggle
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  render();
}

// R3 - delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  render();
}

// R4 + B3 + B4
function updateCounters() {
  let remaining = tasks.filter(t => !t.done).length;
  let completed = tasks.filter(t => t.done).length;

  counter.innerText = `${remaining} tasks remaining`;
  doneCounter.innerText = `${completed} completed`;

  // B4 - milestone
  if (tasks.length > 0 && remaining === 0) {
    counter.innerText = "🎉 All tasks done!";
    counter.style.color = "green";
  } else {
    counter.style.color = "black";
  }
}

// B1 - clear all
function clearAll() {
  tasks = [];
  render();
}

// B5 - color picker
function setBg(color) {
  document.body.style.background = color;
}

// Enter key support (bonus usability)
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});