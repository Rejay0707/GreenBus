
import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import userRoutes from './Routes/userRoute.js'
import busRoutes from './Routes/busRoutes.js';
import cookieParser from 'cookie-parser';
import tripRoute from './Routes/tripRoute.js';
import ticketRoute from './Routes/ticketRoute.js';
import getTicketByIdRoute from './Routes/getTicketByIdRoute.js';
import getAllTicketRoute from './Routes/getAllTicketRoute.js';
import getTripByIdRoute from './Routes/getTripByIdRoute.js';



connectDB();//Connect to MongoDB
const port = process.env.PORT || 8000;

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use('/api/users', userRoutes)
app.use('/api/bus',busRoutes)
app.use('/api/trip',tripRoute)
app.use('/api/ticket',ticketRoute)
app.use('/api/ticketById',getTicketByIdRoute)
app.use('/api/getAllTicket',getAllTicketRoute)
app.use('/api/getTripById',getTripByIdRoute)

app.listen(port ,()=>{
    console.log('Server running on '+ port)
})

