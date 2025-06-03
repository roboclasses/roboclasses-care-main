import { Feedback } from "../models/feedback.model.js";

export const createFeedbackController = async(req, res)=>{
    try {
        const {batch, student, teacher, email, destination, feedbackAnswer, recommendProgram, additionalFeedback} = req.body;

        const data = await Feedback.create({batch, student, teacher, email, destination, feedbackAnswer, recommendProgram, additionalFeedback});
        console.log(data);

        res.status(201).json({success: true, message: "Feedback created successfully"})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getFeedbackController = async(_req, res)=>{
    try {
        const data = await Feedback.find();
        console.log(data); 

        res.status(200).json(data)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getFeedbackByIdController = async(req, res)=>{
    try {
        const {id} = req.params; 

        const data = await Feedback.findById(id)
        console.log(data);
        
        res.status(200).json(data)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const updateFeedbackController = async(req, res)=>{
    try {
        const {id} = req.params;
        const feedbackDetails = req.body;

        const data = await Feedback.findByIdAndUpdate(id, {...feedbackDetails, isCompleted:true}, {new: true})
        console.log(data);

        res.status(200).json({success: true, message: "Feedback updated successfully."})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const deleteFeedbackController = async(req, res)=>{
    try {
        const {id} = req.params;
        const data = await Feedback.findByIdAndDelete(id)
        console.log(data);
        res.status(204).end()
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error"})
    }
}