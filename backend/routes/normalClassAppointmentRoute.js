import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import {
  createNormalClassController,
  deleteNormalClassController,
  getNormalClassController,
  getNormalClassControllerById,
  updateNormalClassController,
} from "../controllers/normalClass.controller.js";
// import scheduleReminders from "../jobs/scheduler.js";


const router = express.Router();

router.post("/appointments/normalClass", createNormalClassController);

router.get("/appointments/normalClass", getNormalClassController);

router.get("/appointments/normalClass/:id", getNormalClassControllerById);

router.put("/appointments/normalClass/:id", updateNormalClassController);

router.delete("/appointments/normalClass/:id", authMiddleware, roleMiddleware("admin"), deleteNormalClassController );

export default router;
