//here it retrieves the input box and list container elements from the HTML using their IDs on html file
const inputBox = document.getElementById("input");
const listContainer = document.getElementById("list");

//here is defined a function to add a new task to the list
function addTask() {
    //this if checks if the input box is empty
    if (inputBox.value === '') {
        //it alerts the user if no task has been entered
        alert("No task entered!");
    } else {
        const li = document.createElement("li");//it creates a new list item element for the task
        li.textContent = inputBox.value; //it sets the text of the list item to what the user entered in the input box
        const span = document.createElement("span");// Create a new span element to serve as the delete button
        span.textContent = "\u00d7"; //it sets the text of the span to a multiplication symbol (it will look like a delete icon)
        span.classList.add("delete-btn"); //it adds a class to the span for styling and to identify it as a delete button
        li.appendChild(span); //it appends the span element to the list item
        listContainer.appendChild(li);//this appends the list item to the list container in the HTML file
        updateStorage(); //it updates the local storage with the new list created
    }
    inputBox.value = "";//it clears the input box after a task has been added
}

//here is added an event listener to the list container to handle clicks on list items and delete buttons
listContainer.addEventListener("click", function(e) {
    //it checks if the clicked element is a list item
    if (e.target.tagName === "LI") {
        // if it is a list item, it will toggle the 'checked' class to mark or unmark the task as completed
        e.target.classList.toggle("checked");
    //it checks if the clicked element is a span and contains the 'delete-btn' class
    } else if (e.target.tagName === "SPAN" && e.target.classList.contains("delete-btn")) {
        //if not, it removes the list item that contains the delete button
        e.target.parentElement.remove();
    }
    //it updates the local storage after any change
    updateStorage();
}, false);

//here is defined a function to update the local storage with the current list
function updateStorage() {
    //it will store the HTML content of the list container in local storage under the key 'data'
    localStorage.setItem("data", listContainer.innerHTML);
}

//here is declared a function to display tasks from local storage when the page loads
function showTask() {
    //it retrieves the task list from local storage
    const savedTasks = localStorage.getItem("data");
    //it checks if there are saved tasks, set the HTML content of the list container to these tasks
    if (savedTasks) {
        listContainer.innerHTML = savedTasks;
    }
}

//it calls all the showTask function to display tasks when the page is loaded
showTask();
