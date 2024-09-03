import { sp1 } from "../Models/Sp1Schema.js";
import {sp2}    from "../Models/Sp2Schema.js"
import {sp3}    from "../Models/Sp3Schema.js"
import { User } from "../Models/UserSchema.js";


export const CreateSubscription = async function (req,res) {
    try {
        const {UserInfo,subscription,userEmail} = req.body
        if(!(UserInfo,subscription)){
            return res.status(400).json({
                message:"All Field required",
                sucess:false
            })
        }
          
        if(subscription == "sp1"){
            const data = await sp1.create({
                _id:UserInfo,
                UserInfo
            })

            if(data){
        const update = await User.findOneAndUpdate({email:userEmail},{isVerified:true})

                return res.status(201).json({
                    message:"User created Sucess",
                    sucess:true,
                    resp:data,
                    update

                })
            }
        }

        else if(subscription == "sp2"){

            const data = await sp2.create({
                UserInfo
            })

            if(data){
        const update = await User.findOneAndUpdate({email:userEmail},{isVerified:true})

                return res.status(201).json({
                    message:"User created Sucess",
                    sucess:true,
                    resp:data,
                    update

                })
            }
        }

        else if(subscription == "sp3"){

            const data = await sp3.create({
                _id:UserInfo,
                UserInfo
            })

            if(data){
        const update = await User.findOneAndUpdate({email:userEmail},{isVerified:true})

                return res.status(201).json({
                    message:"User created Sucess",
                    sucess:true,
                    resp:data,
                    update

                })
            }
        }



    } catch (error) {
        console.log("error on create subscription",error.message);
            return res.status(500).json({
                message:"Error on add subscription",
                sucess:false,
                error   
            })
    }
}


