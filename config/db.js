// import mongoose from "mongoose";

// const connectDB= async () =>{
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI);
//         console.log(` MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//     console.log(`Error:${error.message}`); 
//     process.exit(1) 
//     }
// };

// export default connectDB;


import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({path: "../config/config.env"});

const connectDB = async () => {
try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (error) {
    // console.error(`Error: ${error}`);
    // process.exit(1);
    console.log(error.message)
}
};

export default connectDB;




