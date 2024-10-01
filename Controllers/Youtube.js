import { YoutubeRegister } from "../Models/YoutubeRegisterSchema.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";

export const YoutubeRegisation = async function (req,res) {
    try {
        const {UserEmail,Name,ChannelName,MobileNo,EmplId,Subscription}=req.body
         
       if(!(UserEmail,Name,ChannelName,MobileNo,EmplId,Subscription)){
        return res.status(400).json({
            message:"All field are required",
            sucess:false
        })
       }
       const  thumbnail = req.file.path
       console.log("for photo",thumbnail);

       const result = await uploadOnCloudinary(req.file.path);
               
           
       if(!result.url){
         return res.status(400).json({
             message:"Error on Upload the image",
             success:false
         })
      }
       
       const register = await YoutubeRegister.create({
        UserEmail,
        Name,
        ChannelName,
        MobileNo,
        EmplId,
        Subscription,
        thumbnail:result.url
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

export const GetYoutubeCard = async function (req,res) {
    try {
      const card = await YoutubeRegister.find({isverifed:true}) 
    
      console.log("card data",card);
      
      if(card){
        res.status(200).json({
            message:"sucessfully Get the card",
            data:card,
            sucess:true
        })
      }
      
    } catch (error) {
        console.log("error on getting the youtube card",error.message);
        res.status(500).json({
            message:"Server Error",
            sucess:false
        })
        
    }
}