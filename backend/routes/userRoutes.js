import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import { authLimiter } from "../config/rateLimits.js"

const router = express.Router();

router.post('/signup',authLimiter, async(req,res)=>{
    try {
        const {name, email, password, role} = req.body;
        const user = await User.findOne({email})

        if(user)
        {
            return res.status(409).json({success:false, message:"User already exist, you can login"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const userModel = new User({name:name, email:email, role:role, password:hashedPassword})
        await userModel.save();
        
        return res.status(201).json({success:true, message:"Signed-up successfully"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error"})
        
    }
})

router.post('/login', authLimiter, async(req,res)=>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})
        if(!user)
        {
            return res.status(404).json({success:false, message:"No user found with this email"})
        }

        const matchedPassword = await bcrypt.compare(password, user.password)
        if(!matchedPassword)
        {
            return res.status(403).json({success:false, message:"Invalid credential"})
        }

        const jwtToken = jwt.sign({email:user.email, _id:user._id, role:user.role},process.env.JWT_SECRET,{expiresIn:"10d"})

        return res.status(200).json({
            success:true, 
            message:"Logged-in successfully", 
            jwtToken, 
            _id:user._id, 
            name:user.name, 
            email:user.email,
            role:user.role,
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:"Internal server error"})                
    }
})

export default router;