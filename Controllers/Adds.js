import { Adds } from "../Models/AddsSchema.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";


export const CreateAdds = async function (req,res) {
      try {
        const {startTime,endTime} = req.body
        const AddImage = req.file
        console.log(AddImage,req.file);
        const image = await uploadOnCloudinary(req.file.path)
         console.log("after upload on cloudnairy",image.url);
         if(image.url){
            const create = await Adds.create({
                AddImage:image.url,
                startTime:startTime,
                endTime:endTime
            })
            if(create){
                res.status(200).json({
                    message:"Add created SucessFully",
                    sucess:true
                })
            }
         }
         
        
      } catch (error) {
         console.log("error on creating adds",error.message);
           res.status(500).json({
            message:"Error on creating adds",
            sucess:false
           })
      }
}

export const GetAdds = async function (req,res) {
    try {
        const add = await Adds.find()
         if(add){
            res.status(200).json({
                message:"Getting adds",
                sucess:true,
                data:add
            })
         }
    } catch (error) {
        console.log("error on getting adds",error.message);
        res.status(500).json({
            message:"Error on getting adds",
            sucess:false
        })
    }
}