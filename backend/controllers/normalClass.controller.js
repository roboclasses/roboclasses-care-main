import { isValidObjectId } from "mongoose";
import { NormalClass } from "../models/normalClass.model.js";
import { Student } from "../models/student.model.js";

// import scheduleReminders from "../jobs/scheduler.js";

export const createNormalClassController = async(req, res)=>{
    try {
        const { teacher, userName, destination, email, batch, time, date, items, weekDay, timeZone, numberOfClasses } = req.body;

        const student  = await Student.findOne({email})
        console.log(student);
        if(!student){
            res.status(404).json({success: false, message: "No student found with this email."})
        }

        const normalClassModel = new NormalClass({ teacher, userName, studId:student._id, destination, email, batch, time, date, items, weekDay, timeZone, numberOfClasses })
        await normalClassModel.save();

        // scheduleReminders(newAppointment)

        res.status(201).json({success: true, message: "Normal Class appointment created successfully."})
           
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
}

export const getNormalClassController = async(_req, res)=>{
    try {
        const data = await NormalClass.find();
        console.log(data);
        res.status(200).json(data)   
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
        
    }
}

export const getNormalClassControllerById = async(req, res)=>{
    try {
        const {id} = req.params;

        const data = await NormalClass.findById(id)
        console.log(data);

        res.status(200).json(data)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
}

export const updateNormalClassController = async(req, res)=>{
    try {
        const {id} = req.params;
        const normalClassDetails = req.body;

        const data = await NormalClass.findByIdAndUpdate(id, normalClassDetails, {new: true})
        console.log(data);

        res.status(200).json({success: true, message: "Normal Class appointment updated successfully."})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
        
    }
}

export const deleteNormalClassController = async(req, res)=>{
    try {
        const {id} = req.params;

        // Validate the ID format
        if (!isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID format." });
        }

        const data = await NormalClass.findByIdAndDelete(id);
        console.log(data);

        res.status(204).end()
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
}