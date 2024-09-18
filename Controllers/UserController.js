import { User } from "../Models/UserSchema.js";


export const register = async function (req,res) {
    try {
        const {email,name,acessToken} = req.body
        const Email = email.toLowerCase()
        console.log("email",req.body);
        
        if(!(email,name)){
            return res.status(400).json({
                message:"Name and email is required"
            })
        }
        const alreadyuser = await User.findOne({Email})
             
        if(alreadyuser){
            return res.status(401).json({
                message:'This user Already Exist',
                sucess:false
            })
        }
       
        const userdata = await User.create({
            email:Email,
            username:name,
            acessToken,
            isVerified:false,
           
        })
        if(userdata){
            return res.status(200).json({
                message:"User created Sucessfully",
                data:userdata,
                sucess:true
            })
        }

    } catch (error) {
        console.log("error on the register user",error.message);
        res.status(500).json({
            message:"Error on register the user",
            sucess:false,
            error:error.message
        })
        
    }
}


export const login = async function(req,res) {
    try {
        const {email,name,acessToken} = req.body
        console.log("email",req.body);
        const alreadyuser = await User.findOne({email})
        if(!alreadyuser){
            return res.status(400).json({
                message:"This user does not exist",
                sucess:false
            })
        }
        if(alreadyuser){
            const value  = await User.findOneAndUpdate({email},{acessToken:acessToken})
            console.log('on resp send',value);
            
            return  res.status(200).json({
                message:"user Login sucess",
                data:value,
                userId:value._id,
                sucess:true
            })
        }
    } catch (error) {
        console.log("error on login register");
        res.status(500).json({
            message:`Error on Login user`,
            error:error.message,
            sucess:false
        })
        
    }
}

export const deleteuser = async function(req,res){
    try {
        
        const {deleteId} = req.body
        console.log("in delete",req.body);
        
        if(!deleteId){
            return res.status(400).json({
                message:"UserId is required",
                sucess:false
            })
        }
        const deletedata = await User.findByIdAndDelete({_id:deleteId})
        console.log("delete data",deletedata);
        
        res.status(200).json({
            message:"User Delete sucessfully",
            sucess:true
        })

    } catch (error) {
         console.log("error on delete user",error.message);
         res.status(500).json({
            message:"Server Error",
            sucess:false
         })
         
    }
}

export const Forverify = async function (req,res) {
       try {
        console.log("for verification",req.body);
        
        const userdata = await User.find({isVerified:false});
        if(userdata){
            return res.status(200).json({
                message:"SucessFully get data",
                sucess:true,
                data:userdata
            })
        }

       } catch (error) {
        console.log("error on getting user for verify",error.message);
        res.status(500).json({
             message:"Error on getting user for verify",
             sucess:false,
             error:error.message
        })
        
       }
}









