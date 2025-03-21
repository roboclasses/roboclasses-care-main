import express from "express";
import { createCourseController, deleteCourseController, getCourseController, getCoursesController, updateCourseController } from "../controllers/course.controller.js";

const router = express.Router();

router.post("/courses", createCourseController)

router.get("/courses", getCoursesController)

router.get("/courses/:id", getCourseController)

router.put("/courses/:id", updateCourseController)

router.delete("/courses/:id", deleteCourseController)


export default router;