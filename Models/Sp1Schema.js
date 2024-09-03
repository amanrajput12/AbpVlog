import mongoose from "mongoose";



const sp1Schema = new mongoose.Schema({
    GradePay:{
    type:Number,
    default:1600
    },
    TotalEarning:{
        type:Number,
        default:0
    },
    UserInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 

  }, { timestamps: true });

  export const sp1 = mongoose.model('sp1',sp1Schema)



