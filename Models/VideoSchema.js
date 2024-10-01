import mongoose from "mongoose";


const VideoSchema = new mongoose.Schema({
    videoId:{
        type:String,
        required:true
    },
    startTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        required:true
    },
    CardNo:{
      type:String,
      default:"1"
    },
    Amount:{
      type:Number,
      default:1
    },
    snippet:{
        type:Object,
        required:true
    },
    
})

const Video = mongoose.model("Video",VideoSchema)

export {Video}