import express from "express";
import { createFeedbackController, deleteFeedbackController, getFeedbackByIdController, getFeedbackController, updateFeedbackController } from "../controllers/feedback.controller.js";

const router = express.Router();

router.post('/feedbacks', createFeedbackController)
router.get('/feedbacks', getFeedbackController)
router.get('/feedbacks/:id', getFeedbackByIdController)
router.put('/feedbacks/:id', updateFeedbackController)
router.delete('/feedbacks/:id', deleteFeedbackController)


export default router;