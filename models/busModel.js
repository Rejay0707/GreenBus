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
        isSleeper:{
            type:Boolean, //default is true
            required:true,
        },
        busPrice:{
        type:String,
        required:true,
        },
    
},{
    timestamps:true,
});

const Bus=mongoose.model('Bus',busSchema);

export default Bus;