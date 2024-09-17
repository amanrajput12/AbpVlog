import { Attendance } from "../Models/AttendanceSchema.js";


export const EmployAttendace = async function (req,res) {
    try {
       const {userId,status}  = req.body
       console.log("in employ attendece",req.body);
       
       if(!(userId,status)){
        return res.status(400).json({
            message:"Id and Status required",
            sucess:false
        })
       }
       const attendace = await Attendance.create({
        userId,
        status,
       }) 
       if(attendace){
        res.status(200).json({
            message:"Attendance Mark Sucessfully",
            sucess:false
        })
       }
       console.log("on mark attendce",attendace);
       
    } catch (error) {
        console.log("error on mark attendance",error.message);
        res.status(500).json({
            message:"Server Error",
            sucess:false
        })
    }
}