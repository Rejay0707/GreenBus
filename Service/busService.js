import Bus from "../models/busModel.js";

    // BusProfile
const busProfile=async (userId,busNumber,totalSeat,isSleeper)=>{
    const createBus=await Bus.create({
        userId,busNumber,totalSeat,isSleeper
    });
    return createBus
}

const verifyBusExistence=async(busNumber)=>{
    const bus=await Bus.findOne({busNumber})
    return bus
}

export {busProfile,verifyBusExistence}