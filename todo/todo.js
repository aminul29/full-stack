
    const fs = require('fs'); // 01 require the filesystem module
    const filePath = './todo/tasks.json'; // 02 specify the file path

    // 07 we have to first load the tasks file before adding task to it
    const loadTasks = () => {
        // 08 try to read the tasks file
        try {
            const dataBuffer = fs.readFileSync(filePath); // 09 read the tasks file
            const dataJSON = dataBuffer.toString(); // 10 convert the data buffer to a string
            return JSON.parse(dataJSON);  // 11 parse the string to an object
        } catch (error) {
            return []; // 12 return an empty array if the file does not exist
        }
    }

    const saveTasks = (tasks) => {
        const dataJSON = JSON.stringify(tasks); // 16 convert the tasks object to a string
        fs.writeFileSync(filePath, dataJSON); // 17 write the string to the tasks file
    }

    // 06 create a function to add taks
    const addTask = (task) => {
        // 13 load the tasks
        const tasks = loadTasks();
        // 14 add the task to the tasks array
        tasks.push({task});
        // 15 save the tasks to the tasks file
        saveTasks(tasks);
        // 18 print a success message
        console.log("Task added successfully", task);
    }

    const listTasks = () => {
        // 18 load the tasks
        const tasks = loadTasks();
        // 19 print the tasks
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.task}`);
        });
    }

    const command = process.argv[2]; // 04 get the command from the first argument
    const argument = process.argv[3]; // 05 get the argument from the second argument

    // 03 CRUD functions for the task list
    if (command === "add"){
        addTask(argument);
    }else if(command === "list"){
        listTasks();
    }else if(command === "remove"){
        removeTask(parseInt(argument));
    }else{
        console.log("Invalid command");
    }
