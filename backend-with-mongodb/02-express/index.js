
    // 01 Import the express module
    import express from 'express';

    // logger-01: import the winston morgan logger
    import logger from "./logger.js";
    import morgan from "morgan";

    // 02 create an express app
    const app = express();

    // 03 define a port
    const port = 3000;

    // 05 use the express.json middleware to parse incoming requests with JSON payloads. 
    // this means convert the request body to a JavaScript object
    app.use(express.json());

    // logger-02: use the morgan format to log the requests
    const morganFormat = ":method :url :status :response-time ms";

    // logger-03: use the morgan middleware to log the requests
    app.use(
    morgan(morganFormat, {
        stream: {
        write: (message) => {
            const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
            };
            logger.info(JSON.stringify(logObject));
        },
        },
    })
    );
    
    // 06 create an array to store the users data
    let userData = [];
    // 07 an unique identifier to assign to each user
    let nextId = 1;

    // 08 take user date with the post method
    app.post('/users', (req, res) => {
        // 09 get the user data from the request body
        const {name, salary} = req.body;
        const newUser = {id: nextId++, name, salary}; // 10 create a new user object
        userData.push(newUser); // 11 push the new user object to the users array
        res.status(201).send(newUser); // 12 send the new user object to the client
        // after a successful POST request to users, the client receives the new user data and knows the creation was successful.
    })

    // 13 read the user data with the get method to list all the users
    app.get('/users', (req, res) => {
        // 14 send the user data to the client
        res.status(200).send(userData);
    });

    // 15 read the user data with the get method to get a specific user
    app.get('/users/:id', (req, res) => {
        // 16 find the user with the given id that matches the id in the url.
        const user = userData.find(targetUser => targetUser.id === parseInt(req.params.id));
        // 17 if the user is not found
        if(!user) {
            return res.status(404).send('User not found');
        }
        // 18 If the user is found, send the user data to the client
        res.status(200).send(user);
    });


    // 19 update the user data with the put method to update a specific user
    app.put('/users/:id', (req, res) => {
        // 20 find the user with the given id that matches the id in the url
        const user = userData.find(targetUser => targetUser.id === parseInt(req.params.id));
        // 21 if the user is not found
        if(!user) {
            return res.status(404).send('User not found');
        }
        // 22 get the user data from the request body
        const {name, salary} = req.body;
        user.name = name; // 23 update the user name
        user.salary = salary; // 24 update the user salary
        res.status(200).send(user); // 25 send the updated user data to the client
    });

    // 26 delete the user data with the delete method to delete a specific user
    app.delete('/users/:id', (req, res) => {
        // 27 find the user with the given id that matches the id in the url
        const index = userData.findIndex(targetUser => targetUser.id === parseInt(req.params.id));
        // 28 if the user is not found
        if(index === -1) {
            return res.status(404).send('User not found');
        }
        // 29 remove the user from the users array
        userData.splice(index, 1);
        res.status(200).send('User deleted');
    });

    // 04 start the server and listen to the port with a call back function
    app.listen(port, () =>{
        console.log(`Server is running at http://localhost:${port}`);
        // 4.1 now we can run "npm run start" on the console and we should see the message
    });


