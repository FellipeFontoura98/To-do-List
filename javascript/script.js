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

    
})