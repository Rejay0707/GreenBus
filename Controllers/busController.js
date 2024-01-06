import asyncHandler from "../Middleware/asyncHandler.js";
import{busProfile,verifyBusExistence} from '../Service/busService.js';
import {userId} from "../Middleware/authMiddleware.js";



const generateBus=asyncHandler(async(req,res)=>{
try {
    const {busNumber, totalSeat, isSleeper} = req.body
    if(!busNumber || !totalSeat){
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

    const user_id = userId(req);

    const bus = await busProfile(user_id, busNumber, totalSeat, isSleeper)

    res.status(200).json({
        user_id: bus.userId,
        busNumber: bus.busNumber,
        totalSeat: bus.totalSeat,
        isSleeper: bus.isSleeper
    })
} catch (error) {
    res.status(500).json({ message: error.message })
}
})

export { generateBus }