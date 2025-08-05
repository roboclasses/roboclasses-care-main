import { StudentHoliday } from "../models/studentHoliday.model.js";

export const createStudentHolidayController = async(req, res)=>{
    try {
        const {holiday, dateRange} = req.body;
        const data = await StudentHoliday.create({holiday, dateRange})
        console.log(data);
        return res.status(201).json({success: true, message: 'Holiday created successfully.'})
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: 'Internal server error.'})
    }
}

export const getStudentHolidayController = async(req, res)=>{
    try {
        const data = await StudentHoliday.find();
        console.log(data);
        return res.status(200).json(data)
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: 'Internal server error.'})
    }
}