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

    console.log("current time",time);
    const {email,name,acessToken} = req.body
    
    try {
        const getdata = await Video.find({ startTime: { $lt: time }, endTime:{$gt:time}});
       console.log(getdata);
              
        res.status(200).json({
            message:"Get Data",
            data:getdata
        })
    } catch (error) {
        console.log("error on getting video");
        res.status(500).json({
            message:"Error on getting video ",
            sucess:false,
            error:error.message
        })
        
    }
}

export const AdminGetVideo = async function (req,res) {
    try {
         const Getvideo  = await Video.find()
         if(Getvideo){
            res.status(200).json({
                message:"Getting video sucess",
                sucess:true,
                Getvideo
            })
         }
    } catch (error) {
        console.log("error on getting video on admin");
        res.status(500).json({
            message:"Error on getting video",
            sucess:false
        })
        
    }
}

export const AdminDelete = async function (req,res) {
   try {
     const {id} =req.body;
     const value = req.body.id
     console.log(req.body,id);
     
     const data = await Video.findByIdAndDelete({_id:value})
     console.log("getting ",data);
     
    
      res.status(200).json({
        message:"video delete sucess",
        sucess:true,

      })
       

   } catch (error) {
     console.log("error on delete video");
     res.status(500).json({

     })
     
   }  
} 


