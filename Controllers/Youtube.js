import { YoutubeRegister } from "../Models/YoutubeRegisterSchema.js";


export const YoutubeRegisation = async function (req,res) {
    try {
        const {UserEmail,Name,ChannelName,MobileNo,EmplId,Subscription}=req.body
         
       if(!(UserEmail,Name,ChannelName,MobileNo,EmplId,Subscription)){
        return res.status(400).json({
            message:"All field are required",
            sucess:false
        })
       }
       const register = await YoutubeRegister.create({
        UserEmail,
        Name,
        ChannelName,
        MobileNo,
        EmplId,
        Subscription
       })
       if(register){
        res.status(200).json({
            message:"Yotube YoutubeRegisation success",
            sucess:true
        })
       }
        
    } catch (error) {
           console.log("error on register youtube",error.message);
           res.status(500).json({
            message:"Server Error on Register Youtube",
            sucess:false
           })
           
    }
}