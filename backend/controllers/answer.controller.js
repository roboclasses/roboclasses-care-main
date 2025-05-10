import { Answer } from "../models/answer.model.js";

export const createAnswerController = async(req, res)=>{
    try {
        const {answer, candidate, assessmentId} = req.body;

        const data = await Answer.create({answer, candidate, assessmentId})
        console.log(data);

        res.status(201).json({success: true, message: "Answer set created successfully."})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
}