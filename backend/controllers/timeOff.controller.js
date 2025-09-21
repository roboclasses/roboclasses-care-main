import { Leaves } from "../models/timeOff.model.js";

export const createTimeOffController = async(req, res)=>{
    try {
        const { employeeName, timeOffType, dateRange, notes } = req.body;

        const data = await Leaves.create({ employeeName, timeOffType, dateRange, notes });
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

export const getTimeOffControllerById = async(req, res)=>{
    try {
        const {id} = req.params;
        const data = await Leaves.findById(id)

        return res.status(200).json(data)
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: "Internal server error."})   
    }
}

export const updateTimeOffController = async(req, res)=>{
    try {
        const {id} = req.params;
        const timeOffDetails = req.body;

        const data = await Leaves.findByIdAndUpdate(id, timeOffDetails, {new: true})
        console.log(data);

        const updatedTimeOff = await Leaves.findById(id)

        return res.status(200).json({success: true, message: `Time off ${updatedTimeOff.status} successfully`})
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: "Internal server error."})   
    }
}

