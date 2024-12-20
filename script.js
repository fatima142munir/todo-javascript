// create a variable todo and get data from local storage if data does not exist then consider it empty array 
let todo = JSON.parse(localStorage.getItem("todo")) || [];

// store DOM elements in variables
const input = document.getElementById('inputTask');
const btn = document.getElementById('addTask');
const tasks = document.getElementById('tasks');
const delAllBtn = document.getElementById('delAllBtn');

// Add a new task
function add() {
    if (input.value.trim().length === 0) {
        alert("..........Please enter a task..........");
    } else {
        todo.push({
            text: input.value.trim(),
            completed: false
           
        });
        saveToLocalStorage();
        // Re-render the task list
        renderTasks(); 
        // Clear input
        input.value = ""; 
    }
}

// Render tasks from localStorage
function renderTasks() {
    // Clear the task list to avoid duplicates
    tasks.innerHTML = ""; 
    todo.forEach((item, index) => {
        let newElement = document.createElement("li");
        newElement.innerHTML = `
            ${index + 1}-
            ${item.text}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>`;
        

        // Add the task to the DOM
        tasks.appendChild(newElement);

        // Delete task from added list
        newElement.querySelector("svg").addEventListener("click", () => {
            // Remove the task from todo array
            todo.splice(index, 1); 
            saveToLocalStorage();
            // Re render updated list
            renderTasks(); 
        });
        // line-through for completed tasks
        if (item.completed) {
            newElement.style.textDecoration = "line-through";
        }
        newElement.addEventListener("click", () => {
            item.completed = !item.completed;
            saveToLocalStorage();
            // Re render updated list
            renderTasks(); 
        });
    });
}


// Save the tasks to localStorage 
function saveToLocalStorage() {
    // use json.strigify to convert object in string
    localStorage.setItem("todo", JSON.stringify(todo));
}

// Clear all tasks
delAllBtn.addEventListener("click", () => {
    // Clear the array
    todo = []; 
    saveToLocalStorage();
    // Clear the task list from the DOM
    renderTasks(); 
});

// Add task on Enter key press
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        add();
    }
});

// Render tasks on page load
renderTasks();
console.log(todo);


