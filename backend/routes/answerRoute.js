import express from "express";
import { createAnswerController } from "../controllers/answer.controller.js";

const router = express.Router();

router.post('/assessment/answer', createAnswerController)

export default router;