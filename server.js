
import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';




connectDB();//Connect to MongoDB
const port=process.env.PORT || 8000;

const app = express();


app.listen(port,()=>console.log(`Server running on port ${port}`))