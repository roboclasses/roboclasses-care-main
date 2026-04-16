import express from "express";

import {authMiddleware} from "../middlewares/auth.middleware.js"
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { createBatchController, deleteBatchController, getBatchByIdController, getBatchController, updateBatchController } from "../controllers/batch.controller.js";


const router = express.Router();


// router.post("/newBatchEntries", authMiddleware, roleMiddleware("teacher", "admin"), createBatchController);

// // router.post("/newBatchEntries", createBatchController);

// router.get("/newBatchEntries", authMiddleware, roleMiddleware("teacher", "admin", "student", "contractor"), getBatchController);

// router.get("/newBatchEntries/:id", authMiddleware, roleMiddleware("teacher", "admin", "student", "contractor"), getBatchByIdController);

// router.put("/newBatchEntries/:id", authMiddleware, roleMiddleware("teacher", "admin"), updateBatchController);

// router.delete("/newBatchEntries/:id", authMiddleware, roleMiddleware("admin"), deleteBatchController);



router.post("/newBatchEntries", createBatchController);

// router.post("/newBatchEntries", createBatchController);

router.get("/newBatchEntries", getBatchController);

router.get("/newBatchEntries/:id", getBatchByIdController);

router.put("/newBatchEntries/:id", updateBatchController);

router.delete("/newBatchEntries/:id", deleteBatchController);


export default router;