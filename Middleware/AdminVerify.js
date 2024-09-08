import { User } from "../Models/UserSchema.js";




export const  AdminVerify = async function (req,res,next) {

   try {
     const {userId} = req.body
  
     console.log("reahed to admin middleware",req.body);
   
     console.log(userId);
    
       
       
   if (!userId) {
       return res.status(401).json({ message: 'User not authenticated' });
   }
    const user = await User.findOne({_id:userId})
    console.log("for user check",user);
    
 
   if (user.role!=="admin") {
       return res.status(403).json({ message: 'User is not verified' });
   }
 
   next()
   } catch (error) {
         console.log("error on checking valid admin",error);
         res.status(500).json({
            message:"Error on admin verify",
            sucess:false
         })
         
   }
}
