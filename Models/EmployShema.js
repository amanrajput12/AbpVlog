import mongoose from "mongoose";

const EmploySchema = new mongoose.Schema({
    name:{
    type:String,
    required:true
   },
   emplId:{
    type:String,
    required:true
   } ,
   email:{
    type:String,
    required:true
   },
   reportingManager:{
    type:String,
    required:true
   },
   joiningDate:{
    type:Date,
    required:true
   },
   accountNo:{
    type:String,
    required:true
   },
   ifscCode:{
    type:String,
    required:true
   },
   department:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   BranchLocation:{
    type:String,
    required:true
   },
     EmployRole:{
        type:String,
        required:true
     }
},{
    timestamps:true
})


export const Employ = new mongoose.model("Employ",EmploySchema)