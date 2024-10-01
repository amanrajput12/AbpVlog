import mongoose from "mongoose";

const YoutubeRegisterSchema = new mongoose.Schema({
    UserEmail:{
        type:String,
        required:true
    },
    isverifed:{
      type:Boolean,
      default:false
    },
    CardNo:{
      type:String,
      default:null
    },
    thumbnail:{
      type:String,
      required:true
    },
    Name:{
        type:String,
        required:true
    },
    ChannelName:{
        type:String,
        required:true
    },
    MobileNo:{
        type:Number,
        required:true
    },
    EmplId:{
        type:String,
        required:true
    },
    Subscription:{
        type:Number,
        required:true
    }
},{timestamps:true})

export const YoutubeRegister = mongoose.model("YoutubeRegister",YoutubeRegisterSchema)
