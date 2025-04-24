import { Attendance } from "../models/attendance.model.js";

export const createAttendanceController = async(req,res)=>{
    try {
        const { batchName, startDate, classes, teacher } = req.body;

        const data = await Attendance.create({ batchName, startDate, classes, teacher })
        console.log(data);

        res.status(201).json({success: true, message: "Attendance created successfully."})
          
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})  
    }
}

export const getAttendancesController = async(_req,res)=>{
    try {
        const data = await Attendance.find();
        console.log(data);

        res.status(200).json(data) 
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})   
    }
}

export const getAttendanceController = async(req,res)=>{
    try {
        const {id} = req.params;

        const data = await Attendance.findById(id)
        console.log(data);

        res.status(200).json(data)
           
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})      
    }
}

export const updateAttendanceController = async(req,res)=>{
    try {
        const {id} = req.params;
        const attendanceDetails = req.body;
        const data = await Attendance.findByIdAndUpdate(id, attendanceDetails, {new: true})
        console.log(data);
        
        res.status(200).json({success: true, message: "Attendance updated successfully."})
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})     
    }
}

export const deleteAttendanceController = async(req,res)=>{
    try {
        const {id} = req.params;

        const data = await Attendance.findByIdAndDelete(id)
        console.log(data);

        res.status(200).json({success: true, message: "Attendance deleted successfully."})

    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})    
    }
}