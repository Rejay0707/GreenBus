import{busProfile} from '../Service/busService.js';
import {userId} from "../middleware/authMiddleware.js";


const generateBus = async (req, res)=> {
    try {
        const {busNumber, totalSeat, isSleeper} = req.body

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
        res.status(500).json({ message: "Bus already exist" })
    }
}

export { generateBus }