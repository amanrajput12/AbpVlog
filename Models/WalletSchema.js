import mongoose, { Schema } from "mongoose";


const WalletSchema = new mongoose.Schema({
     TotalBalance:{
        type:Number,
        default:0
     },
     userId:{
        type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      require:true
     },
     email:{
        type:String,
        require:true
     },
     withdrwalreq:{
      type:Date
     }
})

const Wallet = mongoose.model("Wallet",WalletSchema)

export {Wallet}