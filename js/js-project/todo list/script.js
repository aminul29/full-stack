document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input")
  const addTaskButton = document.getElementById("add-tasks")
  const taskList = document.getElementById("task-list")


  let tasks = JSON.parse(localStorage.getItem("tasks")) || [] // get tasks from local storage or if no tasks are found, initialize as empty array


  tasks.forEach((task) => renderTasks(task)) // loop through each task and render it


  addTaskButton.addEventListener("click", () => {
      // store the task text in a variable and trim it
      const taskText = todoInput.value.trim()
      // check if the task text is not empty
      if(taskText === "") return // do nothing if empty
      // create a new task object with the text and completed status
      const newTask = {
          id: Date.now(), // unique id based on timestamp
          text: taskText, // task text
          completed: false // initial completed status
      }


      // add the new task to the tasks array
      tasks.push(newTask)
      // render the new task
      renderTasks(newTask)
      // save the tasks to local storage
      saveTasks()
      // clear the input field
      todoInput.value = ""


      console.log(tasks) // log the tasks array to the console
  })


  function renderTasks(task) {
      const li = document.createElement("li") // create a new list item
      li.setAttribute("data-id", task.id) // set the data-id attribute to the task id
      if(task.completed) li.classList.add("completed") // add completed class if task is completed
      // set the inner HTML of the list item to display the task text and delete button
      li.innerHTML =`
      <span>${task.text}</span> <!-- display the task text -->
      <button class="delete-task">Delete</button> <!-- delete button -->`
     
      li.addEventListener("click", (e) => {
          if(e.target.tagName === "BUTTON") return // if the click target is the delete button, do nothing
          task.completed = !task.completed // toggle the completed status
          li.classList.toggle("completed") // toggle the completed class
          saveTasks() // save the tasks to local storage
      })


      li.querySelector('button').addEventListener("click", (e) => {
          e.stopPropagation() // prevent the click event from bubbling up to the li element. // Prevents the event from reaching the <li>


          tasks = tasks.filter(filtered => filtered.id !== task.id) // filter out the deleted task from the tasks array by creating a new array that only includes tasks whose id does not match task.id.


          li.remove() // remove the li with the task.id from the DOM
          saveTasks() // save the tasks to local storage
      })


      taskList.appendChild(li) // append the list item to the task list
  }


  // function to save tasks to local storage as json string
  function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks))
  }
})
