document.addEventListener('DOMContentLoaded', function () {
    // Get references to elements in the DOM
    const analogClock = document.getElementById('analogClock');
    const digitalClock = document.getElementById('digitalClock');
    const calendar = document.getElementById('calendar');
    const todoForm = document.getElementById('todoForm');
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const todoList = document.getElementById('todoList');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Function to update the analog and digital clocks, and the calendar
    function updateClock() {
        const now = new Date();  // Get the current date and time

        const hours = now.getHours();  // Get the current hours
        const minutes = now.getMinutes();  // Get the current minutes
        const seconds = now.getSeconds();  // Get the current seconds

        // Calculate the degrees for the hands of the analog clock
        const hourDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30 + 90;
        const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
        const secondDegrees = (seconds / 60) * 360 + 90;

        // Update the analog clock with new hand positions
        analogClock.innerHTML = `
            <div class="hand hour" style="transform: rotate(${hourDegrees}deg);"></div>
            <div class="hand minute" style="transform: rotate(${minuteDegrees}deg);"></div>
            <div class="hand second" style="transform: rotate(${secondDegrees}deg);"></div>
        `;

        // Update the digital clock
        digitalClock.innerText = now.toLocaleTimeString();
        // Update the calendar
        calendar.innerText = now.toDateString();
    }

    // Function to load tasks from localStorage 
    function loadTasks() {
        // Retrieve tasks from localStorage, or initialize with an empty array if none exist
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        // Add each task to the DOM
        tasks.forEach(task => addTaskToDOM(task.text, task.priority));
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        // Collect all tasks from the DOM and store them in the tasks array
        todoList.querySelectorAll('li').forEach(item => {
            tasks.push({
                text: item.firstChild.textContent,
                priority: item.classList.contains('low') ? 'low' :
                          item.classList.contains('medium') ? 'medium' : 'high'
            });
        });
        // Save the tasks array to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task to the DOM
    function addTaskToDOM(taskText, priority) {
        const listItem = document.createElement('li');  // Create a new list item element
        listItem.className = `list-group-item d-flex justify-content-between align-items-center ${priority}`;
        listItem.innerText = taskText;  // Set the text of the list item to the task text

        // Create a delete button for the task
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';  // Use FontAwesome trash icon

        // Add an event listener to the delete button to remove the task when clicked
        deleteBtn.addEventListener('click', function () {
            todoList.removeChild(listItem);  // Remove the task from the DOM
            saveTasks();  // Save the updated list of tasks to localStorage
        });

        listItem.appendChild(deleteBtn);  // Add the delete button to the list item
        todoList.appendChild(listItem);  // Add the list item to the task list
    }

    // Event listener for form submission to add a new task
    todoForm.addEventListener('submit', function (e) {
        e.preventDefault();  // Prevent the form from submitting normally

        const taskText = taskInput.value.trim();  // Get the task text from the input
        const priority = priorityInput.value;  // Get the priority from the select input

        if (taskText !== '') {
            addTaskToDOM(taskText, priority);  // Add the new task to the DOM
            saveTasks();  // Save the updated list of tasks to localStorage

            taskInput.value = '';  // Clear the task input
            taskInput.focus();  // Set focus back to the task input
        }
    });

    // Event listener for dark mode toggle button
    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');  // Toggle the dark mode class on the body
    });

    // Update the clock every second
    setInterval(updateClock, 1000);
    updateClock();  // Initial call to display the current time immediately

    // Load tasks from localStorage when the page loads
    loadTasks();
});
