import mongoose from "mongoose";



const sp2Schema = new mongoose.Schema({
    GradePay:{
    type:Number,
    default:3100
    },
    TotalEarning:{
        type:Number,
        default:0
    },
    UserInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 

  }, { timestamps: true });

  export const sp2 = mongoose.model('sp2',sp2Schema)



