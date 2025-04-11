import { Course } from "../models/course.model.js";

export const createCourseController = async(req, res)=>{
    try {
        const {course} = req.body;

        const courseName = await Course.findOne({course})
            if(courseName){
                return res.status(409).json({success:false, message: "Course already exsist."})
            }
        
        const data = await Course.create({course})
        console.log(data);

        return res.status(201).json({success:true, message:"Course successfully created."})
         
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."})     
    }
}

export const getCoursesController = async(_req, res)=>{
    try {
        const data = await Course.find();
        console.log(data);

        return res.status(200).json(data)
         
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."})   
    }
}

export const getCourseController = async(req, res)=>{
    try {
        const {id} = req.params;
        const data = await Course.findById(id);

        return res.status(200).json(data)
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."})  
        
    }
}

export const updateCourseController = async(req, res)=>{
    try {
        const {id} = req.params;
        const courseDetails = req.body;

        const data = await Course.findByIdAndUpdate(id, courseDetails, {new: true})
        console.log(data);

        return res.status(200).json({success: true, message: "Course successfully updated."})
          
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."})  
        
    }
}

export const deleteCourseController = async(req, res)=>{
    try {
        const {id} = req.params;
        const data = await Course.findByIdAndDelete(id);

        return res.status(200).json({success: true, message: "Course successfully deleted."})
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."})  
        
    }
}