import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signupService = async(name, email, password, role)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const usermodel =  new User({name, email, password:hashedPassword, role})
        await usermodel.save();
 
    } catch (error) {
        console.error(error);     
    }
}

