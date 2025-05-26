import express from "express";
import { createAssessmentController, deleteAssessmentController, getAssessmentByIdController, getAssessmentController, upload } from "../controllers/assessment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post('/assessment', upload.single('questions'), createAssessmentController)

router.get('/assessment', getAssessmentController)

router.get('/assessment/:id', getAssessmentByIdController)

router.delete('/assessment/:id', authMiddleware, roleMiddleware('admin'), deleteAssessmentController)




export default router;