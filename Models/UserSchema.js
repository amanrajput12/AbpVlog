import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
         unique:true
    },
    username:{
        type:String,
        required:true
    },
    acessToken:{
       type:String,
       required:true
    },
    role:{
        type:String,
        required:true,
        enum: ['user', 'admin'],
        default:'user'
    }
})

const User = mongoose.model("User",UserSchema)

export {User}