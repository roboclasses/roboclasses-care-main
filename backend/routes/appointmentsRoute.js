import express from "express";
import { Appointment } from "../models/appointment.model.js";

// import scheduleReminders from "../jobs/scheduler.js"

const router = express.Router();

// create appointments
router.post("/appointments/demoClass", async (req, res) => {
  try {
    const { date, userName, destination, course, teacher, time, items } =
      req.body;
    const newAppointment = {
      date,
      userName,
      destination,
      course,
      teacher,
      time,
      items,
    };
    console.log(newAppointment);

    const createAppointments = await Appointment.create({
      date,
      userName,
      destination,
      course,
      teacher,
      time,
      items,
    });
    // await scheduleReminders(newAppointment)
    console.log(createAppointments);
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
    const { date, userName, destination, time, items, course, teacher } =
      req.body;
    const data = await Appointment.findByIdAndUpdate(
      id,
      { date, userName, destination, time, items, course, teacher },
      { new: true }
    );
    console.log(data);

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
router.delete("/appointments/demoClass/:id", async (req, res) => {
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

// update appointment status
router.patch("/appointments/demoClass/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Appointment.findByIdAndUpdate(
      id,
      { status: true },
      { new: true }
    );
    console.log(data);

    return res.status(200).json({
      success: true,
      message: "Your appointment status updated successfully.", data
    });
  } catch (error) {
    console.error(error);
   return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});


export default router;