import express from "express";
import { Appointment } from "../models/demoClass.model.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

import scheduleReminders from "../jobs/scheduler.js"

const router = express.Router();

// create appointments
router.post("/appointments/demoClass", async (req, res) => {
  try {
    const { date, userName, destination, course, teacher, time, items,timeZone, converted, batchNumber} = req.body;

    // const demoClass = await Appointment.findOne({userName, destination});
    // if(demoClass){
    //   return res.status(409).json({success:false, message:"User already applied for demo class."})
    // }

    const newAppointment = {
      date,
      userName,
      destination,
      course,
      teacher,
      time,
      timeZone,
      items,
      converted,
      batchNumber,
    };
    console.log(newAppointment);

    const createAppointments = await Appointment.create(newAppointment)
    console.log(createAppointments);
    
    await scheduleReminders(newAppointment)
    return res.status(201).json({
      success: true,
      message: "appointment created successfully.", createAppointments
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// get all appointments
router.get("/appointments/demoClass", async (req, res) => {
  try {
    const data = await Appointment.find();
    // console.log(data);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// get single appointment
router.get("/appointments/demoClass/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Appointment.findById(id);
    console.log(data);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

// edit appointment 
router.put("/appointments/demoClass/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const  appointmentDetails = req.body;
    const data = await Appointment.findByIdAndUpdate(id, appointmentDetails, { new: true });
    console.log(data);
    // await scheduleReminders(appointmentDetails)

    return res.status(200).json({
      success: true,
      message: "Your appointment is now rescheduled successfully.",
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// delete appointment
router.delete("/appointments/demoClass/:id", authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Appointment.findByIdAndDelete(id);
    console.log(data);

    return res.status(200).json({
      success: true,
      message: "Your appointment is now deleted successfully.", data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});



export default router;