import mongoose from "mongoose";



const sp3Schema = new mongoose.Schema({
    GradePay:{
    type:Number,
    default:5100
    },
    TotalEarning:{
        type:Number,
        default:0
    },
    UserInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 

  }, { timestamps: true });

  export const sp3 = mongoose.model('sp3',sp3Schema)



