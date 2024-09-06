import { User } from "../Models/UserSchema.js";

export const AddWallet = async function (userId,timespend) {
          try {
             console.log(userId,timespend);
             const userdata = await User.findOne({_id:userId})
             console.log("in wallet",userdata);
             
             
          } catch (error) {
             console.log("error on adding wallet");
             
          }
}