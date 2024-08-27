import mongoose, { Mongoose } from "mongoose";

const TimeSpendSchema =new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", 
        required:true
    },
     Time:{
        type:Number,
        required:true
     }
})


export const TimeSpend = mongoose.model("TimeSpend",TimeSpendSchema)