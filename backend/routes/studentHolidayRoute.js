import express from "express";
import { createStudentHolidayController, getStudentHolidayController } from "../controllers/studentHoliday.controller.js";

const router = express.Router();

router.post('/studentHoliday', createStudentHolidayController)
router.get('/studentHoliday', getStudentHolidayController)

export default router;