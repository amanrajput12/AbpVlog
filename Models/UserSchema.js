import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    acessToken: {
        type: String,
        required: true
    },
    isVerified:{
        type:Boolean,
        default:false,
        required:true
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isrefrence:{
        type:Boolean,
        default:false
    },
   
    references: [
        {
            type: String,
        }
    ],
    authId:{
        type:String,
        default:null
    }
});

const User = mongoose.model("User", UserSchema);

export { User };
