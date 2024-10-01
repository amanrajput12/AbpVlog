import { Router } from "express";
import { SubscibeChannel } from "../Middleware/SubscribeChannel.js";


const Cardrouter = Router()


Cardrouter.route('/subscibe').post(SubscibeChannel,(req,res)=>{
    console.log("on check the subscibe ");
    return  res.status(200).json({
        message:"Perform operation sucess",
        sucess:true
    })

    
})


export  {Cardrouter}