
import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import userRoutes from './Routes/userRoute.js'




connectDB();//Connect to MongoDB
const port=process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use('/api/users', userRoutes)

app.listen(5000,()=>console.log(`Server running on port ${port}`))

