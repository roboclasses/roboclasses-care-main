import express from "express";
import { createTimeOffController, getTimeOffController, updateTimeOffController } from "../controllers/timeOff.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/timeOff",authMiddleware, roleMiddleware("teacher"), createTimeOffController)
router.get("/timeOff",authMiddleware, roleMiddleware("teacher", "admin"), getTimeOffController)
router.put("/timeOff/:id",authMiddleware, roleMiddleware("admin"), updateTimeOffController)


export default router;