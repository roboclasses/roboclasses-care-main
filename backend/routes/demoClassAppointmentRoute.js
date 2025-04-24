import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { createDemoClassController, deleteDemoClassesController, getDemoClassesByIdController, getDemoClassesController, updateDemoClassesController } from "../controllers/demoClass.controller.js";


const router = express.Router();

router.post("/appointments/demoClass", createDemoClassController);

router.get("/appointments/demoClass", getDemoClassesController);

router.get("/appointments/demoClass/:id", getDemoClassesByIdController);

router.put("/appointments/demoClass/:id", updateDemoClassesController);

router.delete("/appointments/demoClass/:id", authMiddleware, roleMiddleware('admin'), deleteDemoClassesController);


export default router;