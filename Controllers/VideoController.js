import { Video } from "../Models/VideoSchema.js";


export const AddVideo = async function(req,res){
    try {
       const {id,startTime,endTime,snippet}  = req.body 
       console.log("for backend",req.body);
         if(!(id,startTime,endTime,snippet)){
            return res.status(400).json({
                message:"All field are required"
            })
         }
       const alredyUpload  = await Video.findOne({videoId:id})
       if(alredyUpload){
        return res.status(403).json({
            message:"This video already upload"
        })
       }
       const data = await Video.create({
           videoId:id,
           startTime:startTime,
           endTime:endTime,
           snippet:snippet
       })
       if(data){
        res.status(201).json({
            message:"video Upload sucessfully",
            data:data
        })
       }
    } catch (error) {
        console.log("error on adding the video",error.message);
        
    }
}


export const GetVideo = async function(req,res){
    const time = new Date().toISOString();
    console.log(time);
    try {
        const getdata = await Video.find({ startTime: { $lt: time }, endTime:{$gt:time}});
       console.log(getdata);
       
        res.status(200).json({
            message:"Get Data",
            data:getdata
        })
    } catch (error) {
        console.log("error on getting video");
        
    }
}


