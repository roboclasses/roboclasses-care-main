import express from "express";

import { authLimiter } from "../config/rateLimits.js"
import { loginController, signupController } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/auth/signup',authLimiter, signupController)

router.post('/auth/login', authLimiter, loginController)

export default router;