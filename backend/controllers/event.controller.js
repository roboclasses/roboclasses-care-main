// import { Event } from "../models/event.model.js";


// export const createEventController = async(req,res)=>{
//     try {
//         const {id, title, start, end, allDay, extendedProps} = req.body;

//         const data = await Event.create({id, title, start, end, allDay, extendedProps})
//         console.log(data);
    
//         res.status(201).json({success: true, message: "Event created successfully."})
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({success: false, message: "Internal server error."})
          
//     }

// }

// export const getEventsController = async(req,res)=>{
//     try {
//         const data = await Event.find();
//         console.log(data);

//         res.status(200).json(data)
         
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({success: false, message: "Internal server error."})    
//     }
// }

// export const getEventController = async(req,res)=>{
//     try {
//         const {id} = req.params;

//         const data = await Event.findById(id)
//         console.log(data);

//         res.status(200).json(data)
 
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({success: false, message: "Internal server error."})
        
//     }
// }

// export const updateEventController = async(req,res)=>{
//     try {
//         const {id} = req.params;
//         const eventDetails = req.body;

//         const data = await Event.findByIdAndUpdate(id, eventDetails, {new: true})
//         console.log(data);

//         res.status(200).json({success: true, message:"Event updated successfully."})
            
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({success: false, message: "Internal server error."})   
//     }
// }

// export const deleteEventController = async(req,res)=>{
//     try {
//         const {id} = req.params;

//         const data = await Event.findByIdAndDelete(id)
//         console.log(data);

//         res.status(200).json({success: true, message:"Event deleted successfully."})
  
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({success: false, message: "Internal server error."})  
//     }
// }