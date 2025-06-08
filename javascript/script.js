document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form')
    const taskInput = document.getElementById('task-input')
    const taskList = document.getElementById('task-list')
    const taskCounter = document.getElementById('task-counter')
    const removeCheckedBtn = document.getElementById('remove-checked-btn')
    const progressBar = document.getElementById('progress-bar')

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    const renderTasks = () => {
        taskList.innerHTML = ''

        tasks.array.forEach(task => {
            const li = document.createElement('li')
            li.setAttribute('data-id', task.id)

            if (task.completed) {
                li.classList.add('completed')
            }

            li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <div class=task-actions">
                <i class="fa-solid fa-pencil edit-btn"></i>
                <i class="fa-solid fa-xmark delet-btn"></i>
            </div>
            `;
            taskList.appendChild(li)
        });

        updateFooter()
        saveTasks()
    }
    
})