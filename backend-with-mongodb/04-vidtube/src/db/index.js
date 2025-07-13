    
    // 14 import mongoose
    import mongoose from "mongoose";

    // 15 create a constant for the database name
    import { DB_NAME } from "../constant.js";

    // 16 create a function to connect to the database
    const connectDB = async () => {
        try {
            const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`); 
            // 17 add MONGODB_URI to the .env file
            // 18 console.log the database host
            console.log(` \n MongoDB connected. DB Host: ${connectionInstance.connection.host} \n`);
        } catch (error) {
            console.log("MongoDB connection error", error);
            process.exit(1);
        }
    };

    // 19 export the connectDB function variable
    export default connectDB;

    //20 in src/index.js if the database connection is successful then start the server