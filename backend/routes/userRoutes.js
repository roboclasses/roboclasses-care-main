import express from "express";

import { authLimiter } from "../config/rateLimits.js"
import { deleteUserController, getUserController, getUsersController, loginController, signupController, updateUserController } from "../controllers/user.controller.js";

const router = express.Router();


router.post('/auth/signup',authLimiter, signupController)

router.post('/auth/login', authLimiter, loginController)

router.get('/users', getUsersController)

router.get('/users/:id',getUserController)

router.put('/users/:id',updateUserController)

router.delete('/users/:id', deleteUserController)


export default router;