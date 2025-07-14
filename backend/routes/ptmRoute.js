import express from "express";
import { createPtmController, deletePtmController, getPtmController, getPtmControllerById, updatePtmController } from "../controllers/ptm.controller.js";

const router = express.Router();

router.post('/ptm', createPtmController)

router.get('/ptm', getPtmController)

router.get('/ptm/:id', getPtmControllerById)

router.post('/ptm/:id', updatePtmController)

router.post('/ptm/:id', deletePtmController)

export default router;