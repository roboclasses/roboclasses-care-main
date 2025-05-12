import express from "express";
import { createAnswerController, getAnswerController } from "../controllers/answer.controller.js";

const router = express.Router();

router.post('/answer', createAnswerController)
router.get('/answer', getAnswerController)

export default router;