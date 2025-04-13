import jwt from "jsonwebtoken"

import { User } from "../models/user.model.js";
import { signupService } from "../services/user.service.js";

import bcrypt from "bcrypt";

export const signupController  = async(req, res)=>{
    try {
        const {name, email, password, role} = req.body;
        
        const user = await User.findOne({email})
        if(user){
            return res.status(409).json({success:false, message:"User already exists, you can login."})
        }
        const data = await signupService(name, email, password, role)
        console.log(data);

        return res.status(201).json({success:true, message:"Signed-up successfully."})
           
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error."})   
    }
}

export const loginController = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({success:false, message:"No user found with this email."})
        }

        const matchedPassword = await bcrypt.compare(password, user.password)
        if(!matchedPassword){
            return res.status(403).json({success:false, message: "Invalid credentials."})
        }

        const jwtToken = jwt.sign({email:user.email, _id:user._id, name:user.name, role:user.role}, process.env.JWT_SECRET, {expiresIn: "10d"})

        return res.status(200).json(
        {
            success:true, 
            message: "Logged-in successfully.", 
            jwtToken, 
            name:user.name, 
            email:user.email, 
            _id:user._id, 
            role:user.role
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message: "Internal server error."}) 
    }
}

export const getUsersController = async(req,res)=>{
    try {
        const data = await User.find();
        console.log(data);

        return res.status(200).json(data)
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message: "Internal server error."})
    }
}

export const getUserController = async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await User.findById(id);
        console.log(data);

        return res.status(200).json(data)
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message: "Internal server error."})
    }
}

export const updateUserController = async(req, res)=>{
    try {
        const userDetails = req.body;
        const {id} = req.params;
        const data = await User.findByIdAndUpdate(id, userDetails, {new: true})
        console.log(data);

        return res.status(200).json({success:true, message: "User data successfully updated."})
          
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message: "Internal server error."}) 
    }
}

export const deleteUserController = async(req, res)=>{
    try {
        const {id} = req.params;
        const data = await User.findByIdAndDelete(id)
        console.log(data);

        return res.status(200).json({success:true, message: "User successfully deleted."})

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message: "Internal server error."})   
    }
}
