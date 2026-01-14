import express from "express";
import { authLimiter } from "../config/rateLimits.js"
import { deleteUserController, getUserByIdController, getUserController, getUsersController, loginController, logoutController, signupController, updateUserController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = express.Router();


router.post('/auth/signup',authLimiter, signupController)

router.post('/auth/login', authLimiter, loginController)

router.post('/auth/logout', authLimiter, logoutController)

router.get('/userProfile', authMiddleware, getUserByIdController)

router.get('/users', getUsersController)

router.get('/users/:id',getUserController)

router.put('/users/:id',updateUserController)

router.delete('/users/:id', deleteUserController)


export default router;