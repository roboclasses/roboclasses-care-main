import { Answer } from "../models/answer.model.js";

export const createAnswerController = async(req, res)=>{
    try {
        const {answer, candidate, assessmentId, batch, assessmentLevel, submissionTime} = req.body;

        const data = await Answer.create({answer, candidate, assessmentId, batch, assessmentLevel, submissionTime})
        console.log(data);

        res.status(201).json({success: true, message: "Answer set created successfully."})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
}

export const getAnswerController = async(_req, res)=>{
    try {
        const data = await Answer.find();
        console.log(data);

        res.status(200).json(data)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
}

export const deleteAnswerController = async(req, res)=>{
    try {
        const {id} = req.params;

        const data = await Answer.findByIdAndDelete(id);
        console.log(data);

        res.status(204).end()
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
}