import { User } from "../Models/UserSchema.js";


export const addTeamMember = async function (req,res) {
    try {
        const {userEmail,refrenceEmail} = req.body
        console.log(userEmail,refrenceEmail);
        
        const user = await User.findOne({email:refrenceEmail})
            if(!user){
                return res.status(303).json({
                    message:"This Refrence Email not exist",
                    sucess:false
                })
            }

            if(user.team.length>=5){
                user.references.push(userEmail)
                await user.save()
                return res.status(200).json({
                    message:"Team is full Added to refrence",
                    sucess:true
                })
            }

            user.team.push(userEmail)
            await user.save()
            res.status(200).json({message:"new member is added to the team",
                sucess:true
            })
    } catch (error) {
        console.log("error on adding member",error.message);
          res.status(400).json({
            message:"server Error",
            sucess:false
          })  
    }
}