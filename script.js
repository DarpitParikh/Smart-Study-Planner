// Smart Study Planner - Local Storage Implementation

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const timelineContainer = document.getElementById('timeline-container');

function getTasks() {
    return JSON.parse(localStorage.getItem('studyTasks') || '[]');
}

function saveTasks(tasks) {
    localStorage.setItem('studyTasks', JSON.stringify(tasks));
}

function renderTasks() {
    const tasks = getTasks();
    taskList.innerHTML = '';
    tasks.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.done ? ' done' : '');
        li.innerHTML = `
            <div class="task-details">
                <strong>${task.title}</strong> <br>
                <span>Goal: ${task.goal}</span> <br>
                <span>Date: ${task.date} ${task.time}</span>
                ${task.done ? '<br><span style="color:green;">Completed</span>' : ''}
            </div>
            <div class="task-actions">
                <button class="remind" onclick="setReminder(${idx})">Remind</button>
                <button class="done" onclick="markDone(${idx})">Done</button>
                <button onclick="deleteTask(${idx})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
    renderTimeline(tasks);
}

function renderTimeline(tasks) {
    timelineContainer.innerHTML = '';
    if (tasks.length === 0) {
        timelineContainer.innerHTML = '<span>No tasks yet. Add some!</span>';
        return;
    }
    // Sort by date/time
    const sorted = [...tasks].sort((a, b) => {
        return new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time);
    });
    sorted.forEach(task => {
        const bar = document.createElement('div');
        bar.className = 'timeline-bar' + (task.done ? ' done' : '');
        bar.innerHTML = `
            <div>${task.title}</div>
            <small>${task.date} ${task.time}</small>
        `;
        timelineContainer.appendChild(bar);
    });
}

taskForm.onsubmit = function(e) {
    e.preventDefault();
    const title = document.getElementById('task-title').value.trim();
    const date = document.getElementById('task-date').value;
    const time = document.getElementById('task-time').value;
    const goal = document.getElementById('task-goal').value.trim();
    if (!title || !date || !time || !goal) return;
    const tasks = getTasks();
    tasks.push({ title, date, time, goal, done: false });
    saveTasks(tasks);
    taskForm.reset();
    renderTasks();
};

window.deleteTask = function(idx) {
    const tasks = getTasks();
    tasks.splice(idx, 1);
    saveTasks(tasks);
    renderTasks();
};

window.markDone = function(idx) {
    const tasks = getTasks();
    tasks[idx].done = true;
    saveTasks(tasks);
    renderTasks();
};

window.setReminder = function(idx) {
    const tasks = getTasks();
    const task = tasks[idx];
    const taskDateTime = new Date(task.date + 'T' + task.time);
    const now = new Date();
    if (taskDateTime <= now) {
        alert('This task time has already passed!');
        return;
    }
    // Try to use Notification API
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                const timeout = taskDateTime - now;
                setTimeout(() => {
                    new Notification("Study Reminder", {
                        body: `It's time for: ${task.title} (${task.goal})`
                    });
                }, timeout);
                alert('Reminder set! You will get a notification at the scheduled time.');
            } else {
                alert('Please allow notifications for reminders.');
            }
        });
    } else {
        alert('Notifications are not supported in your browser.');
    }
};


window.onload = renderTasks;
