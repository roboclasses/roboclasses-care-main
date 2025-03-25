import { Leaves } from "../models/timeOff.model.js";

export const createTimeOffController = async(req, res)=>{
    try {
        const { teacherName, timeOffType, date, notes } = req.body;

        const data = await Leaves.create({ teacherName, timeOffType, date, notes });
        console.log(data);

        return res.status(201).json({success: true, message: "Time off created successfully."})
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: "Internal server error."}) 
    }
}

export const getTimeOffController = async(req, res)=>{
    try {
        const data = await Leaves.find();
        console.log(data);

        return res.status(200).json(data)
  
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: "Internal server error."})  
    }
}