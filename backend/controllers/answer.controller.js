import { Answer } from "../models/answer.model.js";

export const createAnswerController = async(req, res)=>{
    try {
        const {answer, candidate, assessmentId, batch, assessmentLevel} = req.body;

        const data = await Answer.create({answer, candidate, assessmentId, batch, assessmentLevel})
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