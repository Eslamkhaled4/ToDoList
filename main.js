
const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskTable = document.getElementById('task-table').getElementsByTagName('tbody')[0];

document.addEventListener('DOMContentLoaded', loadTasks);


function createTaskRow(taskText, isCompleted = false) {
    const tr = document.createElement('tr');
    if (isCompleted) tr.classList.add('completed');

    const tdTask = document.createElement('td');
    tdTask.textContent = taskText;

    const tdAction = document.createElement('td');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';

    tdAction.appendChild(deleteButton);

   
    tr.appendChild(tdTask);
    tr.appendChild(tdAction);

    
    tr.addEventListener('click', function() {
        tr.classList.toggle('completed');
        saveTasks();
    });

   
    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation(); 
        tr.remove();
        saveTasks();
    });

    
    taskTable.appendChild(tr);
}


function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        createTaskRow(taskText);
        taskInput.value = ''; 
        saveTasks();
    }
}


function saveTasks() {
    const tasks = [];
    const rows = taskTable.getElementsByTagName('tr');

    for (let row of rows) {
        const taskText = row.getElementsByTagName('td')[0].textContent;
        const isCompleted = row.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    for (let task of tasks) {
        createTaskRow(task.text, task.completed);
    }
}


addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});