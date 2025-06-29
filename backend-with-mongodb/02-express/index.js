
    // 01 Import the express module
    import express from 'express';

    // 02 create an express app
    const app = express();

    // 03 define a port
    const port = 3000;

    // 04 define a route, when a request is made to the root path the callback function is executed
    app.get("/", (req, res) => {
        res.send("Hello World From Express Server slash route");
    });

    // 04 start the server and listen to the port
    app.listen(port, () =>{
        console.log(`Server is running at http://localhost:${port}`);
    });