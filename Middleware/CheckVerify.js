import { User } from "../Models/UserSchema.js";

// middleware/checkVerified.js
export const checkVerified =async(req, res, next) => {
    const userId = req.query
        console.log(userId);
        
    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
     const user = await User.findOne({_id:userId})

    if (!user.isVerified) {
        return res.status(403).json({ message: 'User is not verified' });
    }

    next(); // If verified, proceed to the next middleware or route handler
};
