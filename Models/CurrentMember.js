import { mongoose } from "mongoose";

const CurrentMemberSchema = new mongoose.Schema({
    Member: {
        type: Number,
        default: 300000
    }
});

export const CurrentMember = mongoose.model("CurrentMember", CurrentMemberSchema);
