import multer from "multer";
import fs from "fs";
import csv from "csv-parser";
import { Course } from "../models/course.model.js";

 const createCourseController = async(req, res)=>{
    try {
        const {course} = req.body;

        const courseName = await Course.findOne({course})
            if(courseName){
                 res.status(409).json({success:false, message: "Course already exsist."})
            }
        
        const data = await Course.create({course})
        console.log(data);

         res.status(201).json({success:true, message:"Course successfully created."})
         
    } catch (error) {
        console.error(error);
         res.status(500).json({success:false, message:"Internal server error."})     
    }
}

 const getCoursesController = async(_req, res)=>{
    try {
        const data = await Course.find();
        console.log(data);

         res.status(200).json(data)
         
    } catch (error) {
        console.error(error);
         res.status(500).json({success:false, message:"Internal server error."})   
    }
}

 const getCourseController = async(req, res)=>{
    try {
        const {id} = req.params;
        const data = await Course.findById(id);

         res.status(200).json(data)
        
    } catch (error) {
        console.error(error);
         res.status(500).json({success:false, message:"Internal server error."})  
        
    }
}

// Configure multer for file-upload
const upload = multer({dest: "/uploads"})

 const updateCourseController = async(req, res)=>{
    try {
        const {id} = req.params;
        const {course, numberOfClasses } = req.body;

        // Check if file is uploaded 
        if(!req.file){
            return res.status(400).json({success: false, message: "No file uploaded."})
        }

        const topics = [];
        const filePath = req.file.path;
        console.log("File path is: "+filePath);

        fs.createReadStream(filePath).pipe(csv()).on('data', (row)=>{
            console.log("topics:"+row.topic);
            const topic = { topic: row.topic };
            topics.push(topic);
        }).on('end', async()=>{
            try {
                const data = await Course.findByIdAndUpdate(id, {course, numberOfClasses, syllabus:topics}, {new: true});
                console.log(data);
                res.status(200).json({success: true, message: "Course updated successfully."})

            } catch (error) {
                console.error(error)

            }
        }).on('error', (error)=>{
            console.error(error);
            res.status(500).json({success: false, message: "Error parsing CSV file."})
        })
          
    } catch (error) {
        console.error(error);
         res.status(500).json({success:false, message:"Internal server error."})  
        
    }
}

 const deleteCourseController = async(req, res)=>{
    try {
        const {id} = req.params;

        const data = await Course.findByIdAndDelete(id);
        console.log(data);
        
         res.status(200).json({success: true, message: "Course successfully deleted."})
        
    } catch (error) {
        console.error(error);
         res.status(500).json({success:false, message:"Internal server error."})  
        
    }
}

 export {createCourseController, getCoursesController, getCourseController, upload, updateCourseController, deleteCourseController};