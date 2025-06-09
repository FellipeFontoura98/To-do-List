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

        tasks.forEach(task => {
            const li = document.createElement('li')
            li.setAttribute('data-id', task.id)

            if (task.completed) {
                li.classList.add('completed')
            }

            li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <i class="fa-solid fa-pencil edit-btn"></i>
                <i class="fa-solid fa-xmark delete-btn"></i>
            </div>
            `;
            taskList.appendChild(li)
        });

        updateFooter()
        saveTasks()
    }

    const updateFooter = () => {
        const totalTasks = tasks.length
        const completedTasks = tasks.filter(task => task.completed).length

        taskCounter.textContent = `${completedTasks} of ${totalTasks} tasks done`

        const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
        progressBar.style.width = `${progress}%`
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const tasktext = taskInput.value.trim()

        if (tasktext !== '') {
            tasks.push({
                id: Date.now(),
                text: tasktext,
                completed: false
            })
            taskInput.value = ''
            renderTasks()
        }
    })
    
    taskList.addEventListener('click', (e) => {
        const target = e.target
        const li = target.closest('li')
        if (!li) return

        const taskId = Number(li.getAttribute('data-id'))
        const task = tasks.find(t => t.id === taskId)

        if (target.type === 'checkbox') {
            task.completed = target.checked
            renderTasks()
        }

        if (target.classList.contains('delete-btn')) {
            tasks = tasks.filter(t => t.id !== taskId)
            renderTasks()
        }

        if (target.classList.contains('edit-btn')) {
            const taskTextSpan = li.querySelector('.task-text')
            const currentText = taskTextSpan.textContent

            const input = document.createElement('input')
            input.type = 'text'
            input.value = currentText
            input.style.flexGrow = '1'

            li.replaceChild(input, taskTextSpan)
            input.focus()

            const saveEdit = () => {
                const newText = input.value.trim()
                if (newText) {
                    task.text = newText
                }
                renderTasks()
            }

            input.addEventListener('blur', saveEdit)
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveEdit()
                }
            })
        }
    })

    removeCheckedBtn.addEventListener('click', () => {
        tasks = tasks.filter(task => !task.completed)
        renderTasks()
    })

    renderTasks()
})