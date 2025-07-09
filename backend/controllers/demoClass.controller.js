import { Appointment } from "../models/demoClass.model.js";
//import scheduleReminders from "../jobs/scheduler.js"


export const createDemoClassController = async(req, res)=>{
    try {
        const {date, userName, destination, course, teacher, time, items,timeZone, converted, batchNumber, isCompensationClass, isZoomMeeting, topic, type, duration, agenda, participants, meetingReminder} = req.body;
        const newDemoClass = {date, userName, destination, course, teacher, time, items,timeZone, converted, batchNumber, isCompensationClass, isZoomMeeting, topic, type, duration, agenda, participants, meetingReminder};

        const data = await Appointment.create(newDemoClass)
        console.log(data);

        //await scheduleReminders(newDemoClass)

         res.status(201).json({success: true, message: "Appointment for demo classes created successfully."})

    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
 
    }
}

export const getDemoClassesController = async(_req,res)=>{
    try {
        const data = await Appointment.find();
        console.log(data);

        res.status(200).json(data)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})   
    }
}

export const getDemoClassesByIdController = async(req,res)=>{
    try {
        const {id} = req.params;

        const data = await Appointment.findById(id)
        console.log(data);

        res.status(200).json(data)

    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})  
    }
}

export const updateDemoClassesController = async(req,res)=>{
    try {
        const {id} = req.params;
        const demoClassesDetails = req.body;

        const data = await Appointment.findByIdAndUpdate(id, demoClassesDetails, {new: true})
        console.log(data);

        //await scheduleReminders(newDemoClass)

        res.status(200).json({success: true, message: "Appointment for demo classes updated successfully."})
           
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
        
    }
}

export const deleteDemoClassesController = async(req,res)=>{
    try {
        const {id} = req.params;

        const data = await Appointment.findByIdAndDelete(id)
        console.log(data);

        res.status(200).json({success: true, message: "Appointment for demo classes deleted successfully."})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error."})
    }
}

