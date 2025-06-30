import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{type:String, enum:["student","teacher","admin","contractor"], required:true},
    workingHours:{type:String, default:""},
    workingDays:{type:String, default:""}
},{timestamps:true})

export const User = mongoose.models.User ?? mongoose.model('User',userSchema);