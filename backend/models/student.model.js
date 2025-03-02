import mongoose from "mongoose";
import { nanoid } from "nanoid";

const studentSchema = new mongoose.Schema({
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NormalClass'
    }],
    studentName:{type:String, required:true},
    studentId:{type:String, index:true, required:true, unique:true, default:()=>nanoid(5)},
    parentName:{type:String, required:true},
    destination:{type:String, required:true},
    email:{type:String, unique:true, index:true, required:true},
    address:{type:String, required:true},
    grade:{type:String, required:true},
    courses:{type:String, required:true}
},{timestamps:true})



export const Student = mongoose.models.Student ?? mongoose.model("Student", studentSchema);