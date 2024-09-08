import { User } from "../Models/UserSchema.js";

// middleware/checkVerified.js
export const checklogin =async(req, res, next) => {
   try {
     const {email} = req.body
  
       console.log("reahed to the login middleware",req.body);
     
       console.log(email);
      
         
         
     if (!email) {
         return res.status(401).json({ message: 'email is not valid' });
     }
     const verify = await User.findOne({email})
      console.log("for user login",verify);
        
      if(!verify){
        return res.status(400).json({
            message:"This user not exist",
            sucess:false
        })
      }
           
     else if(!verify.isVerified) {
         return res.status(403).json({ 
             message: 'User is not verified for login',
             sucess:false
          });
     }
 
     next(); // If verified, proceed to the next middleware or route handler
   } catch (error) {
      console.log("error on checking verify login",error.message);
      res.status(500).json({
        message:"Error on verify user",
        sucess:false
      })
      
   }
};
