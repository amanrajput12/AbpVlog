import { User } from "../Models/UserSchema.js"
import { Wallet } from "../Models/WalletSchema.js";

export const Team = async function (req,res) {
 try {
     const {userId} = req.body   
     const data = await User.findById({_id:userId})
     console.log("data after find",data);
      res.status(200).json({
        message:"Team get sucess",
        sucess:true,
       data:data.references
      })
 } catch (error) {
    console.log("error on getting team",error.message);
    
 }
}

export const TeamWallet = async function (req,res) {
   try {
      
      const {email} = req.body
      console.log(" on team wallet ",req.body);
      
      if(!email){
         return res.status(400).json({
            message:"Email is required",
            sucess:false
         })
      }

      const walletdata = await  Wallet.findOne({email})
      console.log("wallet data",walletdata);
      res.status(200).json({
         message:"SucessFully Get the wallet",
         sucess:true,
         data:walletdata
      })
      
   } catch (error) {
      console.log("error on getting the teamwallet data",error.message);
      return res.status(500).json({
         message:"Server Error",
         sucess:false
      })
      
   }
}