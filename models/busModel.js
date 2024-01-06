import mongoose from "mongoose";

const busSchema=new mongoose.Schema({ 
        userId:   {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
        busNumber:{
            type:String, // 'TN22CS4902 //unique
            required:true,
            unique:true,
        },
        totalSeat:{
            type:Number,
            required:true,
        },
        isSleeper:{
            type:Boolean, //default is true
            default: false
        },
    
},{
    timestamps:true,
});

const Bus=mongoose.model('Bus',busSchema);

export default Bus;