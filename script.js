document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDate');
    const priorityInput = document.getElementById('priority');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const sortByPriorityButton = document.getElementById('sortByPriority');
    const clearAllButton = document.getElementById('clearAll');

    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskActions);
    sortByPriorityButton.addEventListener('click', sortTasksByPriority);
    clearAllButton.addEventListener('click', () => taskList.innerHTML = ''); // Clears all tasks

    function addTask() {
        const taskText = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;

        if (!taskText) {
            alert("Task cannot be empty!");
            return;
        }

        const listItem = document.createElement('li');
        listItem.className = `list-group-item d-flex justify-content-between align-items-center priority-${priority.toLowerCase()}`;
        listItem.innerHTML = `
            <div>
                <span class="task-text">${taskText}</span>
                <small class="text-muted ms-2">${dueDate ? `Due: ${dueDate}` : ""}</small>
            </div>
            <div>
                <button class="btn btn-sm btn-success done-button">Done</button>
                <button class="btn btn-sm btn-danger delete-button">Delete</button>
            </div>
        `;

        checkOverdue(listItem, dueDate); // Highlight overdue tasks
        taskList.appendChild(listItem);
        taskInput.value = "";
        dueDateInput.value = "";
    }

    function handleTaskActions(e) {
        const listItem = e.target.closest('li');
        const taskText = listItem.querySelector('.task-text');
        const doneButton = listItem.querySelector('.done-button');

        if (e.target.classList.contains('done-button')) {
            listItem.classList.toggle('list-group-item-success');
            taskText.classList.toggle('task-done');

            if (taskText.classList.contains('task-done')) {
                doneButton.textContent = "Undo";
                doneButton.classList.remove('btn-success');
                doneButton.classList.add('btn-warning');
            } else {
                doneButton.textContent = "Done";
                doneButton.classList.remove('btn-warning');
                doneButton.classList.add('btn-success');
            }
        }

        if (e.target.classList.contains('delete-button')) {
            listItem.remove();
        }
    }

    function sortTasksByPriority() {
        const tasks = Array.from(taskList.children);
        tasks.sort((a, b) => {
            const priorityOrder = { "high": 1, "medium": 2, "low": 3 };
            return priorityOrder[a.classList[1].split('-')[1]] - priorityOrder[b.classList[1].split('-')[1]];
        });

        taskList.innerHTML = "";
        tasks.forEach(task => taskList.appendChild(task));
    }

    function checkOverdue(listItem, dueDate) {
        if (dueDate && new Date(dueDate) < new Date()) {
            listItem.classList.add('overdue');
        }
    }
});
