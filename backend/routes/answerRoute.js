
import express from "express";
import { createAnswerController, deleteAnswerController, getAnswerController } from "../controllers/answer.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();


router.post('/answer', createAnswerController)

router.get('/answer', getAnswerController)

router.delete('/answer/:id', authMiddleware, roleMiddleware('admin'), deleteAnswerController)



export default router;