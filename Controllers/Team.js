import { User } from "../Models/UserSchema.js"

export const Team = async function (req,res) {
 try {
     const {userId} = req.body   
     const data = await User.findById({_id:userId})
     console.log("data after find",data);
      res.status(200).json({
        message:"Team get sucess",
        sucess:true,
       data:data.references
      })
 } catch (error) {
    console.log("error on getting team",error.message);
    
 }
}