import { User } from "../Models/UserSchema.js";



export const ManagerVerifyuser = async function (req,res) {
 try {
   const {location} = req.body  
   console.log("req body data",req.body);
   
   const respdata = await User.find({isVerified:false,location})
   console.log("On manager verification",respdata);

   if(respdata){
    res.status(200).json({
        message:"Sucessfully get the data",
        sucess:true,
        data:respdata
    })
   }


 } catch (error) {
    console.log("error on verify by manager",error.message);
    res.status(500).json({
        message:"Server Error",
        sucess:false
    })
    
 }   
}