import express from "express";
import { Course } from "../models/course.model.js";

const router = express.Router();
// Create course
router.post("/courses", async(req,res)=>{
    try {
        const {course} = req.body;
        const data = await Course.create({course})
        console.log(data);
        return res.status(201).json({success:true, message:"Course created successfully."})
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."})    
    }
})

// Get courses
router.get("/courses", async(req, res)=>{
    try {
        const data = await Course.find();
        console.log(data);
        return res.status(200).json(data)
  
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."})    
  
    }
})

// Get course
router.get("/courses/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const data = await Course.findById(id)
        console.log(data);
        return res.status(200).json(data)
  
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."})    
  
    }
})

// Update course
router.put("/courses/:id", async(req, res)=>{
    try {
        const {course} = req.body;
        const {id} = req.params;
        const data = await Course.findByIdAndUpdate(id, {course}, {new:true})
        console.log(data);
        return res.status(200).json({success:true, message: "Course updated successfully."})
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."})    
        
    }
})

// Delete course
router.delete("/courses/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const data = await Course.findByIdAndDelete(id)
        console.log(data);
        return res.status(200).json({success:true, message: "Course deleted successfully."})
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."})      
    }
})


export default router;