
    // 01 Import the express module
    import express from 'express';

    // 02 create an express app
    const app = express();

    // 03 define a port
    const port = 3000;

    // 05 use the express.json middleware to parse incoming requests with JSON payloads. 
    // this means convert the request body to a JavaScript object
    app.use(express.json());
    
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

    // 04 start the server and listen to the port with a call back function
    app.listen(port, () =>{
        console.log(`Server is running at http://localhost:${port}`);
        // 4.1 now we can run "npm run start" on the console and we should see the message
    });


