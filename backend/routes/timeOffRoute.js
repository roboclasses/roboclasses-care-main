import express from "express";
import { createTimeOffController, getTimeOffController, getTimeOffControllerById, updateTimeOffController } from "../controllers/timeOff.controller.js";


const router = express.Router();

router.post("/timeOff", createTimeOffController)
router.get("/timeOff", getTimeOffController)
router.get("/timeOFf/:id", getTimeOffControllerById)
router.put("/timeOff/:id", updateTimeOffController)


export default router;