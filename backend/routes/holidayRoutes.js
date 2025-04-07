import express from "express";
import { createHolidayController } from "../controllers/holiday.controller.js";

const router = express.Router();

router.post("/holiday", createHolidayController)


export default router;