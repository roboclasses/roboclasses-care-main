import express from "express";
import { NewBatchEntries } from "../models/newBatchEntry.model.js";
import {authMiddleware} from "../middlewares/auth.middleware.js"
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

// for new batch entry module
// create new batch
router.post("/newBatchEntries", authMiddleware, roleMiddleware("teacher", "admin"), async (req, res) => {
  try {
    const { teacher, batch } = req.body;
    const data = await NewBatchEntries.create({
      teacher,
      batch,
    });

    console.log(data);

    res.status(201).json({
      success: true,
      message: "New batch successfully created.", data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// get batches
router.get("/newBatchEntries", authMiddleware, roleMiddleware("teacher", "admin", "user"), async (req, res) => {
  try {
    const data = await NewBatchEntries.find();
    console.log(data);

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// get a single batch
router.get("/newBatchEntries/:id", authMiddleware, roleMiddleware("teacher", "admin", "user"), async (req, res) => {
  try {
    const { id } = req.params;
    const data = await NewBatchEntries.findById(id);
    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

  // update a batch
router.put("/newBatchEntries/:id", authMiddleware, roleMiddleware("teacher", "admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const { teacher, batch } = req.body;
    const data = await NewBatchEntries.findByIdAndUpdate(
      id,
      { teacher, batch },
      { new: true }
    );
    console.log(data);

    return res.status(200).json({
      success: true,
      message: "New batch successfully updated.", data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// partially update a batch
router.patch("/newBatchEntries/:id", authMiddleware, roleMiddleware("teacher", "admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const data = await NewBatchEntries.findByIdAndUpdate(
      id,
      { status: true },
      { new: true }
    );
    console.log(data);

    return res.status(200).json({
      success: true,
      message: "New batch partially updated.", data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// delete a batch
router.delete("/newBatchEntries/:id", authMiddleware, roleMiddleware("teacher", "admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const data = await NewBatchEntries.findByIdAndDelete(id);
    console.log(data);

    return res.status(200).json({
      success: true,
      message: "New batch successfully deleted.", data
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