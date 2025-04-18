import express from "express";
import { Attendance } from "../models/attendance.model.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
const router = express.Router();

// for attendance module
// create attendance
router.post("/attendances", async (req, res) => {
  try {
    const { batchName, startDate, classes, teacher } = req.body;
    const data = await Attendance.create({ batchName, startDate, classes, teacher });
    console.log(data);

    return res.status(201).json({
      success: true,
      message: "Attendance created successfully.",
      data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// get attendances
router.get("/attendances", async (req, res) => {
  try {
    const data = await Attendance.find();
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

// get single attendance
router.get("/attendances/:id",async(req,res)=>{
  try {
    const {id} = req.params;
    const data = await Attendance.findById(id);
    console.log(data);
    return res.status(200).json(data)
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success:false,
      message:"Internal server error!"
    })
  }
})

// delete attendance
router.put('/attendances/:id',async(req,res)=>{
  try {
    const {batchName, startDate, classes, teacher, leave, } = req.body;
    const {id} = req.params;
    const data = await Attendance.findByIdAndUpdate(id,{batchName, startDate, classes, teacher, leave, },{new:true})
    console.log(data);
    return res.status(200).json({
      success:true,
      message:"Attendance successfully updated."
    })
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success:false,
      message:"Internal server error!"
    })
    
  }

})

// update attendance
router.delete('/attendances/:id', authMiddleware, roleMiddleware('admin'),async(req,res)=>{
  try {
    const {id} = req.params;
    const data = await Attendance.findByIdAndDelete(id)
    console.log(data);
    return res.status(200).json({
      success:true,
      message:"Attendance successfully deleted."
    })
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success:false,
      message:"Internal server error!"
    })
    
  }

})



export default router;
