import express from "express";
import { createHolidayController, getHolidaysController } from "../controllers/holiday.controller.js";

const router = express.Router();

router.post("/holiday", createHolidayController)
router.get("/holiday", getHolidaysController)


export default router;