import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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



export const Student = mongoose.models.Student ?? mongoose.model("Student", studentSchema);