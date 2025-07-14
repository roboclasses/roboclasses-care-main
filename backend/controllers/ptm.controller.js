import { PTM } from "../models/ptm.model.js";

export const createPtmController = async(req, res)=>{
    try {
        const {batch, studentName, email, destination, teacher, timeZone, date, time, topic, type, duration, agenda, participants, isMeetingSetting, meetingReminder} = req.body;
        const data = await PTM.create({batch, studentName, email, destination, teacher, timeZone, date, time, topic, type, duration, agenda, participants, isMeetingSetting, meetingReminder});
        console.log(data);
        return res.status(201).json({success: true, message: "Parent Teacher meeting created successfully"})
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getPtmController = async(_req, res)=>{
    try {
        const data = await PTM.find();
        console.log(data);
        return res.status(200).json(data);
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getPtmControllerById = async(req, res)=>{
    try {
        const {id} = req.params;
        const data = await PTM.findById(id);
        console.log(data);
        return res.status(200).json(data);
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const updatePtmController = async(req, res)=>{
    try {
        const {id} = req.params;
        const ptmDetails = req.body;
        const data = await PTM.findByIdAndUpdate(id, ptmDetails, {new: true});
        console.log(data);
        return res.status(200).json({success: true, message: "PTM details updated successfully"})
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const deletePtmController = async(req, res)=>{
    try {
        const {id} = req.params;
        await PTM.findByIdAndDelete(id);
        return res.status(204).end();
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}