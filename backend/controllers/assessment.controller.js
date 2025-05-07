import fs from "fs";
import multer from "multer";
import csv from 'csv-parser';

import { Assessment } from "../models/assessment.model.js";


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
            const assessment = {
              batch,
              assessmentLevel,
              questions: [
                {
                  question: row.question,
                  option: {
                    a: row.A,
                    b: row.B,
                    c: row.C,
                    d: row.D,
                  },
                  answer: row.answer,
                },
              ],
            };
            assessments.push(assessment);
          }
        })
        .on('end', async () => {
          try {
            const data = await Assessment.insertMany(assessments);
            // console.log(data);
            
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

export {upload, createAssessmentController};