import express from "express";
import { createTimeOffController, getTimeOffController } from "../controllers/timeOff.controller.js";


const router = express.Router();

router.post("/timeOff", createTimeOffController)
router.get("/timeOff", getTimeOffController)


export default router;