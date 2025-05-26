import fs from "fs";
import multer from "multer";
import csv from 'csv-parser';

import { Assessment } from "../models/assessment.model.js";
import mongoose from "mongoose";


// Configure multer for file upload
const upload = multer({dest: 'uploads/'})

const createAssessmentController = async(req, res)=>{
    try {        
        // Check if file is uploaded and form data is provided
        if(!req.file){
            return res.status(400).json({success: false, message: "No file uploaded."})
        }

        const assessments = [];
        const filePath = req.file.path;
        console.log("file path:", filePath);
        
        const {batch, assessmentLevel} = req.body;

        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          console.log("rows: ", row.question +" answer: ",row.answer);
          
          if (row.question && row.answer) {

            const question = {
              question: row.question,
              option: {
                a: row.A,
                b: row.B,
                c: row.C,
                d: row.D,
              },
              answer: row.answer,

            }
            assessments.push(question);
          }
        })
        .on('end', async () => {
          try {
            const newAssessment = new Assessment({batch, assessmentLevel, questions:assessments})
            await newAssessment.save()
            
            fs.unlinkSync(filePath);
            res.status(201).json({ success: true, message: 'Assessment Created successfully.' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error saving assessment to database.' });
          }
        })
        .on('error', (error) => {
          console.error('CSV parsing error', error);
          res.status(500).json({ success: false, message: 'Error parsing CSV file.' });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})        
    }
}

const getAssessmentController = async(_req, res)=>{
  try {
    const data = await Assessment.find();
    console.log(data);

    res.status(200).json(data)

  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Internal server error."})
  }
}

const getAssessmentByIdController = async(req, res)=>{
  try {
    const {id} = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid assessment ID" });
    }

    const data = await Assessment.findById(id)
    console.log(data);

    res.status(200).json(data)
    
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Internal server error."})
    
  }
}

const deleteAssessmentController = async(req, res)=>{
  try {
    const {id} = req.params;

    const data = await Assessment.findByIdAndDelete(id)
    console.log(data);

    res.status(204).end();
    
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Internal server error."})
  }
}


export {upload, createAssessmentController, getAssessmentController, getAssessmentByIdController, deleteAssessmentController};