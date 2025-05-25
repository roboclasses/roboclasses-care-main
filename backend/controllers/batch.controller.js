import { NewBatchEntries } from "../models/batch.model.js";


export const createBatchController = async(req, res)=>{
    try {
        const { day, time, startDate, teacher, batch, timeZone, numberOfClasses, studentName, destination, email, completed } = req.body;

        const data = await NewBatchEntries.create({ day, time, startDate, teacher, batch, timeZone, numberOfClasses, studentName, destination, email, completed })
        console.log(data);

        res.status(201).json({success: true, message: "New batch created successfully."})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
}

export const getBatchController = async(_req, res)=>{
    try {
        const data = await NewBatchEntries.find();
        console.log(data);

        res.status(200).json(data)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
        
    }
}

export const getBatchByIdController = async(req,res)=>{
    try {
        const {id} = req.params;

        const data = await NewBatchEntries.findById(id)
        console.log(data);

        res.status(200).json(data)

    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
}

export const updateBatchController = async(req,res)=>{
    try {
        const {id} = req.params;
        const batchDetails = req.body;

        const data = await NewBatchEntries.findByIdAndUpdate(id, batchDetails, {new: true})
        console.log(data);

        res.status(200).json({success: true, message: "Batch details updated successfully."})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
}

export const deleteBatchController = async(req,res)=>{
    try {
        const {id} = req.params;

        const data = await NewBatchEntries.findByIdAndDelete(id)
        console.log(data);

        res.status(204).end()
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
        
    }
}