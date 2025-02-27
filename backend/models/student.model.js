import mongoose from "mongoose";
// import { nanoid }from "nanoid"

const studentSchema = new mongoose.Schema({
    // studId:{type:String, default:()=>nanoid(), unique:true},
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NormalClass'
    }],
    studentName:{type:String, required:true},
    parentName:{type:String, required:true},
    destination:{type:String, required:true},
    email:{type:String, unique:true, index:true, required:true},
    address:{type:String, required:true},
    grade:{type:String, required:true},
    courses:{type:String, required:true}
})



export const Student =  mongoose.model("Student", studentSchema);