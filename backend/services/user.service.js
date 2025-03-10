import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signupService = async(name, email, password, role)=>{
    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const usermodel =  new User({name, email, password:hashedPassword, role})
        await usermodel.save();
 
    } catch (error) {
        console.error(error);     
    }
}

