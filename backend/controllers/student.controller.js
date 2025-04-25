import { Student } from "../models/student.model.js";

export const createStudentController = async(req,res)=>{
    try {
        const {studentName, parentName, destination, email, address, grade, courses} = req.body;

        const data = await Student.create({studentName, parentName, destination, email, address, grade, courses})
        console.log(data);

        res.status(201).json({success: true, message: "Student created successfully."})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
}

export const getStudentsController = async(_req,res)=>{
    try {
        const data = await Student.find();
        console.log(data);

        res.status(200).json(data)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
        
    }
}

export const getStudentByIdController = async(req,res)=>{
    try {
        const {id} = req.params;

        const data = await Student.findById(id)
        console.log(data);

        res.status(200).json(data)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
}

export const updateStudentController = async(req,res)=>{
    try {
        const {id} = req.params;
        const studentDetails = req.body;

        const data = await Student.findByIdAndUpdate(id, studentDetails, {new: true})
        console.log(data);

        res.status(200).json({success: true, message: "Student details updated successfully."})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
}

export const deleteStudentController = async(req,res)=>{
    try {
        const {id} = req.params;

        const data = await Student.findByIdAndDelete(id);
        console.log(data);

        res.status(200).json({success: true, message: "Student deleted successfully."})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
}
