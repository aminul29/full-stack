
    // 01 Import the express module
    import express from "express";

    // 10 import cors
    import cors from "cors";

    import cookieParser from "cookie-parser";

    // 02 create an express app
    const app = express();

    // 11 use cors middleware to allow cross-origin requests in the app
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true
        })
    );

    // 12 in the .env file set the CORS_ORIGIN

    // 13 set the limit of the request body for security. common middleware
    app.use(express.json({limit: "16kb"}));
    app.use(express.urlencoded({extended: true, limit: "16kb"}));

    // use the cookie-parser middleware
    app.use(cookieParser());

    // 13 create a constant for the database name in src/constant.js
    // 14 import mongoose in db/index.js

    // 03 Export the app
    export { app };

    // 04 in src/index.js import the app


    // import routes
    import healthcheckRouter from "./routes/healthcheck.routes.js";

    // use middleware to use the routes
    app.use("/api/v1/healthcheck", healthcheckRouter);
