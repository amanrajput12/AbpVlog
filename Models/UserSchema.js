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
    accessToken: {
        type: String,
        // required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    },
    team: [
        {
            type: String,
            ref: 'User',
        }
    ],
    references: [
        {
            type: String,
        }
    ],
});

const User = mongoose.model("User", UserSchema);

export { User };
