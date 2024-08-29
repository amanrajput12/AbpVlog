import mongoose, { Mongoose } from "mongoose";


const timeSpendSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoId: { type: String, ref: 'Video', required: true },
  timeSpend: { type: Number, default: 0 }, // Time in seconds
  lastWatched: { type: Date, default: Date.now },
});

export const  TimeSpend = mongoose.model('TimeSpent', timeSpendSchema);

