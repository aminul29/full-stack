
    // 01 Import the express module
    import express from 'express';

    // 02 create an express app
    const app = express();

    // 03 define a port
    const port = 3000;

    // 05 use the express.json middleware to parse incoming requests with JSON payloads. 
    // convert the request body to a JavaScript object
    app.use(express.json());
    
    // 06 create an array to store the users and an id counter
    let users = [];
    let id = 1;

    app.post('/teas', (req, res) => {
        req.body.price = Number(req.body.price);
    })

    // 04 start the server and listen to the port
    app.listen(port, () =>{
        console.log(`Server is running at http://localhost:${port}`);
    });