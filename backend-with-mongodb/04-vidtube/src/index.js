
    // 05 import dotenv module
    import dotenv from "dotenv";
    
    // 04 import the express app from the app.js file
    import { app } from "./app.js";

    // 06 in .env file add the PORT=7000

    // 07 load the .env file
    dotenv.config({
        path: "./.env"
    });

    // const PORT = 7000; // 05 define the port
    const PORT = process.env.PORT || 8001; // 08 create and get the port from the .env file
    // 8.1 now we can run "npm run dev" on the console and we should see the message
    // app.listen(PORT, () => {
    //     console.log(`Server is running at http://localhost:${PORT}`);
    // });

    // 00 import the connectDB function from the db/index.js file
    import connectDB from "./db/index.js";

    //20.1 if the database connection is successful then start the server
    connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error", err);
    })

    // 08 run the command npm run dev on the terminal to start the server

    // 09 install npm i cors in the terminal to use cors

    // 10 in app.js import cors

