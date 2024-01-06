import Bus from "../models/busModel.js";

    // BusProfile
const busProfile=async (user_id,busNumber,busSeat,isSleeper)=>{
    const createBus=await Bus.create({
        user_id,busNumber,busSeat,isSleeper
    });
    return createBus
}

const verifyBusExistence=async(busNumber)=>{
    const bus=await Bus.findOne({busNumber})
    return bus
}

export {busProfile,verifyBusExistence}