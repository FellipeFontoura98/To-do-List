document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskCounter = document.getElementById('task-counter');
    const removeCheckedBtn = document.getElementById('remove-checked-btn');
    const themeSwitcher = document.querySelector('.theme-switcher');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    const applyTheme = (themeName) => {
        document.body.setAttribute('data-active-theme', themeName);
        localStorage.setItem('selectedTheme', themeName);
    };

    const loadSavedTheme = () => {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
            applyTheme(savedTheme);
        }
    };

    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', (e) => {
            if (e.target.classList.contains('theme-dot')) {
                const themeName = e.target.dataset.theme;
                applyTheme(themeName);
            }
        });
    }

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.setAttribute('data-id', task.id);
            if (task.priority) {
                li.setAttribute('data-priority', task.priority);
            }
            if (task.completed) {
                li.classList.add('completed');
            }
            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <i class="fa-solid fa-pencil edit-btn"></i>
                    <i class="fa-solid fa-xmark delete-btn"></i>
                </div>
            `;
            taskList.appendChild(li);
        });
        updateFooter();
        saveTasks();
    };

    const updateFooter = () => {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        taskCounter.textContent = `${completedTasks} de ${totalTasks} tarefas feitas`;
    };

    if (taskForm) {
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const taskText = taskInput.value.trim();
            const priorityInput = document.querySelector('input[name="priority"]:checked');
            const taskPriority = priorityInput ? priorityInput.value : 'low';

            if (taskText !== '') {
                tasks.push({ 
                    id: Date.now(), 
                    text: taskText, 
                    completed: false,
                    priority: taskPriority 
                });
                taskInput.value = '';
                renderTasks();
            }
        });
    }

    if (taskList) {
        taskList.addEventListener('click', (e) => {
            const target = e.target;
            const li = target.closest('li');
            if (!li || !li.hasAttribute('data-id')) return;
            const taskId = Number(li.getAttribute('data-id'));
            let task = tasks.find(t => t.id === taskId);
            if (!task) return;

            let shouldRender = true;

            if (target.classList.contains('task-checkbox')) {
                task.completed = target.checked;
            } else if (target.classList.contains('delete-btn')) {
                tasks = tasks.filter(t => t.id !== taskId);
            } else if (target.classList.contains('edit-btn')) {
                const taskTextSpan = li.querySelector('.task-text');
                const input = document.createElement('input');
                input.type = 'text';
                input.value = task.text;
                li.replaceChild(input, taskTextSpan);
                input.focus();
                
                const saveEdit = () => {
                    const newText = input.value.trim();
                    if (newText) task.text = newText;
                    renderTasks();
                };

                input.addEventListener('blur', saveEdit);
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        saveEdit();
                    }
                });
                shouldRender = false;
            }
            
            if(shouldRender) {
                renderTasks();
            }
        });
    }

    if (removeCheckedBtn) {
        removeCheckedBtn.addEventListener('click', () => {
            tasks = tasks.filter(task => !task.completed);
            renderTasks();
        });
    }
    
    // --- INICIALIZAÇÃO ---
    loadSavedTheme();
    renderTasks();
});
