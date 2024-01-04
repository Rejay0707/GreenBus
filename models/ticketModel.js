import mongoose from "mongoose";
import express from express;

const passengerSchema=mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    age:{
        type:Number,
        required:true,
    },
    seatNumber:{
        type:Number,
        required:true,
    }
})
const ticketSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    tripId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    busId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    bookingDate:{
        type:Date,
        required:true,
    },
    passenger:[passengerSchema],
    numberOfSeats:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    departureTime:{
        type:Date,
        required:true,
    },
    arrivalTime:{
        type:Date,
        required:true,
    },
    origin:{
        type:String,
        required:true,
    },
    destination:{
        String,
        required:true,
    },
    isBooked:{
        type:Boolean,
        required:true,
        default:true,
    },
    totalPrice:{
        type:Number,
        required:true,
    }
},{
    timestamps:true,
})

const Ticket=mongoose.model('Ticket',ticketSchema)

export default Ticket