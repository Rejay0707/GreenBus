import asyncHandler from "../middleware/asyncHandler.js";
import{busProfile,verifyBusExistence} from '../Service/busService.js';
import {userId} from "../middleware/authMiddleware.js";
import {busInformation} from '../middleware/busMiddleware.js';

const generateBus = asyncHandler(async (req, res)=> {
    try {
        const {busNumber, totalSeat, isSleeper} = req.body
    const { error } = busInformation(req.body)
    if(error){
        return res.status(400).json({
            message: error.message
        })
    }
        const checkBus = await verifyBusExistence(busNumber)
        if(checkBus){
            return res.status(400).json({
                message: "Bus already Exists"
            })
        }

        const user_id = userId(req)

        const bus = await busProfile(user_id, busNumber, totalSeat, isSleeper)

        res.status(200).json({
            user_id: bus.userId,
            busNumber: bus.busNumber,
            totalSeat: bus.totalSeat,
            isSleeper: bus.isSleeper
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})

export { generateBus }