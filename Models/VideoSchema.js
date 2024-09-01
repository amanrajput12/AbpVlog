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
    snippet:{
        type:Object,
        required:true
    },
    
})

const Video = mongoose.model("Video",VideoSchema)

export {Video}