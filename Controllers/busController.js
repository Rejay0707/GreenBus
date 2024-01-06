import asyncHandler from "../Middleware/asyncHandler.js";
import{busProfile,verifyBusExistence} from '../Service/busService.js';
import {userId} from "../Middleware/authMiddleware.js";


const generateBus=asyncHandler(async(req,res)=>{
try {
    const {busNumber, busSeats, isSleeper} = req.body
    if(!busNumber || !busSeats){
        return res.status(400).json({
            message: "Invaild User data"
        })
    }
    const checkBus = await verifyBusExistence(busNumber)
    if(checkBus){
        return res.status(400).json({
            message: "Bus already Exists"
        })
    }

    const user_id = userId(req)

    const bus = await busProfile(user_id, busNumber, busSeats, isSleeper)

    res.status(200).json({
        user_id: bus.user_id,
        busNumber: bus.busNumber,
        busSeats: bus.busSeats,
        isSleeper: bus.isSleeper
    })
} catch (error) {
    res.status(500).json({ message: error.message })
}
})

export { generateBus }