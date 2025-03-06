import express from "express";
import { Student } from "../models/student.model.js";
import { NormalClass } from "../models/normalClass.model.js";
// import scheduleReminders from "../jobs/scheduler.js";


const router = express.Router();

// route handlers for Normal Class appointments
// Create appointments
router.post("/appointments/normalClass", async (req, res) => {
  try {
    const { teacher, userName, destination, email, batch, time, date, items, weekDay, timeZone, numberOfClasses } = req.body;

    console.log({ teacher, userName, destination, email, batch, time, date, items, weekDay, timeZone, numberOfClasses });
    
    const student = await Student.findOne({email})

    const normalClassModel = new NormalClass({teacher, userName, studId:student._id, destination, email, batch, time, date, items, weekDay, timeZone, numberOfClasses})

    const data = await normalClassModel.save();
    
    // scheduleReminders(newAppointment)

    console.log(data);
    return res.status(201).json({
      success: true,
      message: "Appointment created successfully.", data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

//get appointments
router.get("/appointments/normalClass", async (req, res) => {
  try {
    const data = await NormalClass.find();
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

//get a single appointment
router.get("/appointments/normalClass/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await NormalClass.findById(id);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// update an appointment
router.put("/appointments/normalClass/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { teacher, userName, studId, destination, email, batch, time, date, items, weekDay, timeZone, numberOfClasses } = req.body;

    // const student = await Student.findOne({email})

    // Check if the student exists
    // if (!student) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Student not found with the provided email.",
    //   });
    // }

    const data = await NormalClass.findByIdAndUpdate(
      id,
      { teacher, userName, studId, destination, email, batch, time, date, items, weekDay, timeZone, numberOfClasses },
      { new: true }
    );
    console.log(data);

    return res.status(200).json({
      success: true,
      message: "Appointment successfully updated", data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// delete an appointment
router.delete("/appointments/normalClass/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await NormalClass.findByIdAndDelete(id);
    console.log(data);

    return res.status(200).json({
      success: true,
      message: "Appointment successfully deleted.", data
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
