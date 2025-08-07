import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { createStudentController, deleteStudentController, getStudentByIdController, getStudentsController, updateStudentController } from "../controllers/student.controller.js";

const router = express.Router();

router.post("/students", createStudentController)

router.get("/students", authMiddleware, roleMiddleware('admin', 'teacher'), getStudentsController)

router.get("/students/:id", getStudentByIdController)

router.put("/students/:id", authMiddleware, roleMiddleware('admin'), updateStudentController)

router.delete("/students/:id", authMiddleware, roleMiddleware('admin'), deleteStudentController)


export default router;