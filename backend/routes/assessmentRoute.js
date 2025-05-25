import express from "express";
import { createAssessmentController, getAssessmentByIdController, getAssessmentController, upload } from "../controllers/assessment.controller.js";

const router = express.Router();

router.post('/assessment', upload.single('questions'), createAssessmentController)

router.get('/assessment', getAssessmentController)

router.get('/assessment/:id', getAssessmentByIdController)



export default router;