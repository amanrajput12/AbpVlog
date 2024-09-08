import { User } from "../Models/UserSchema.js";

// middleware/checkVerified.js
export const checkVerified =async(req, res, next) => {
   try {
     const {userId} = req.body
  
       console.log("reahed to the middleware",req.body);
     
       console.log(userId);
      
         
         
     if (!userId) {
         return res.status(401).json({ message: 'User not authenticated' });
     }
      const user = await User.findOne({_id:userId})
      console.log("for user check",user);
      
  
     if (!user.isVerified) {
         return res.status(403).json({ message: 'User is not verified' });
     }
 
     next(); // If verified, proceed to the next middleware or route handler
   } catch (error) {
    console.log("error on checking verification of user",error.message);
    res.status(500).json({
        message:"Error on verify valid request",
        sucess:false
    })
    
   }
};
