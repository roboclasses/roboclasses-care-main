import { Holiday } from "../models/holiday.model.js";

export const createHolidayController = async(req, res)=>{
    try {
        const {holiday, duration} = req.body;
        const data = await Holiday.create({holiday, duration})

        console.log(data);
        return res.status(201).json({success:true, message:"Holiday created successfully."})
           
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."})
    }
}


export const getHolidaysController = async(req, res)=>{
    try {
        const data = await Holiday.find();
        console.log(data);

        return res.status(200).json(data)
 
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."})
        
    }
}