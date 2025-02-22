import express from "express";
import { Student } from "../models/student.model.js";

const router = express.Router();
// Create student
router.post("/students", async(req,res)=>{
    try {
        const {studentName, parentName, destination, email, address, grade, courses} = req.body;
        const data = await Student.create({studentName, parentName, destination, email, address, grade, courses});
        console.log(data);

        return res.status(201).json({success:true, message:"Student registration successfull"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."}) 
    }
})

// Get students
router.get("/students", async(req,res)=>{
    try {
        const data = await Student.find();
        console.log(data);

        return res.status(200).json(data)
 
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."})    
    }
})

// Get student
router.get("/students/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await Student.findById(id)
        console.log(data);

        return res.status(200).json(data)
   
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."})    
    }
})

// Update student
router.put("/students/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const {studentName, parentName, destination, email, address, grade, courses} = req.body;
        const data = await Student.findByIdAndUpdate(id, {studentName, parentName, destination, email, address, grade, courses}, {new: true});
        console.log(data);

        return res.status(201).json({success:true, message:"Student data updated successfully."})
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."}) 
    }
})

// Delete student
router.delete("/students/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await Student.findByIdAndDelete(id)
        console.log(data);

        return res.status(200).json({success:true, message:"Student data deleted successfully."})
   
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."})    
    }
})



export default router;