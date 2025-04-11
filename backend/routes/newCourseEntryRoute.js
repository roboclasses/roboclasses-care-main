import express from "express";
import { createCourseController, deleteCourseController, getCourseController, getCoursesController, updateCourseController } from "../controllers/course.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/courses", createCourseController)

router.get("/courses", getCoursesController)

router.get("/courses/:id", getCourseController)

router.put("/courses/:id", updateCourseController)

router.delete("/courses/:id", authMiddleware, roleMiddleware('admin'), deleteCourseController)


export default router;