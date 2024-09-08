import { User } from "../Models/UserSchema.js";

// middleware/checkVerified.js
export const checklogin =async(req, res, next) => {
    const {email} = req.body
 
      console.log("reahed to the login middleware",req.body);
    
      console.log(email);
     
        
        
    if (!email) {
        return res.status(401).json({ message: 'email is not valid' });
    }
    const verify = await User.findOne({email})
     console.log("for user login",verify);
     
 
    if (!verify.isVerified) {
        return res.status(403).json({ message: 'User is not verified for login' });
    }

    next(); // If verified, proceed to the next middleware or route handler
};
