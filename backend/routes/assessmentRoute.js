import express from "express";
import { createAssessmentController, upload } from "../controllers/assessment.controller.js";

const router = express.Router();

router.post('/assessment', upload.single('questions'), createAssessmentController)

export default router;