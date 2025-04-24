import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { createAttendanceController, deleteAttendanceController, getAttendanceController, getAttendancesController, updateAttendanceController } from "../controllers/attendance.controller.js";


const router = express.Router();

router.post("/attendances", createAttendanceController);

router.get("/attendances", getAttendancesController);

router.get("/attendances/:id", getAttendanceController)

router.put('/attendances/:id', updateAttendanceController)

router.delete('/attendances/:id', authMiddleware, roleMiddleware('admin'), deleteAttendanceController)



export default router;
