import mongoose from "mongoose";

const bookSchema=({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    seatNumber:{
        type:Number,
        required:true,
    }
})

const tripsSchema=({
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
    availableSeats:{
        type:String,
        required:true,
    },
    bookedSeat:[bookSchema],
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
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    }
},{
    timestamps:true,
})

const Trips=mongoose.model('Trip',tripsSchema)

export default Trips