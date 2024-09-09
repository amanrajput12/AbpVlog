import mongoose from "mongoose";



const AddsSchema = new mongoose.Schema({
    AddImage:{
        type:String,
        required:true
    },
    startTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        required:true
    }
},{
    timestamps:true
})

const Adds = mongoose.model("Adds",AddsSchema)

export {Adds}