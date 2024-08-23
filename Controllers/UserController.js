import { User } from "../Models/UserSchema.js";


export const register = async function (req,res) {
    try {
        const {email,name,acessToken} = req.body
        console.log("email",req.body);
        
        if(!(email,name)){
            return res.status(400).json({
                message:"Name and email is required"
            })
        }
        const alreadyuser = await User.findOne({email})
        console.log(alreadyuser);
        
        if(alreadyuser){
            const value  = await User.findOneAndUpdate({email},{acessToken:acessToken})
            return  res.status(201).json({
                message:"user Login sucess",
                data:value
            })
        }
        const userdata = await User.create({
            email,
            username:name,
            acessToken,
        })
        if(userdata){
            return res.status(200).json({
                message:"User created Sucessfully",
                data:userdata
            })
        }

    } catch (error) {
        console.log("error on the register user",error.message);
        
    }
}


