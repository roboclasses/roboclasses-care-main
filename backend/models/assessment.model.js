import mongoose from "mongoose";
import {nanoid} from "nanoid"


const assessmentSchema = new mongoose.Schema({
    batch: {type:String, required: true},
    assessmentLevel: {type:String, required: true},
    questions: [{
        question:{type: String, required: true},
        option:{
            a:{type:String, required:true},
            b:{type:String, required:true},
            c:{type:String, required:true},
            d:{type:String, required:true},
        },
        answer:{type:String, enum:['A','B','C','D'], required: true},
        questionId:{type: String, index:true, required:true, unique:true, default:()=>nanoid(5)}
    }],
}, {timestamps: true})


export const Assessment = mongoose.models.Assessment ?? mongoose.model('Assessment', assessmentSchema)