import { TimeSpend } from "../Models/TimeSpend.js";
import { Video } from "../Models/VideoSchema.js";
import { AddWallet } from "./AddWallet.js";

// Create TimeSpend
export const CreateTimespend = async function (req, res) {
    const { userId, videoId, timeSpend } = req.body;
             console.log("userId",userId,videoId,timeSpend);
             
    try {
     
      let record = await TimeSpend.findOne({ userId, videoId });
          console.log("in alredy present in the db",record);
          
            
      if (record) {
        return res.status(400).json({
          message:"Already watch"
        })
        
      } else {
        // Create a new record
        record = new TimeSpend({ userId, videoId, timeSpend });
      
        
      }
  
      await record.save();
     const wallet = await  AddWallet(userId,timeSpend,videoId)
     console.log("balance in the wallet ",wallet);
     
      res.status(200).json({ success: true, data: record });
    } catch (error) {
        console.log("error on the timespend created",error.message);
        
      res.status(500).json({ success: false, error: 'Server Error' });
    }
}

// Get TimeSpend
export const GetTimespend = async function (req, res) {
  try {
      const timeSpends = await TimeSpend.find().populate('userId'); // Populate only userId

      const populatedTimeSpends = await Promise.all(timeSpends.map(async (timeSpend) => {
          const video = await Video.findOne({ videoId: timeSpend.videoId }); // Manually query Video
          return {
              ...timeSpend.toObject(),
              video, // Include the Video document in the result
          };
      }));

      console.log(populatedTimeSpends);
      
      res.status(200).json({
          message: "TimeSpend retrieved successfully",
          data: populatedTimeSpends
      });
  } catch (error) {
      console.log("Error on getting TimeSpend:", error.message);
      res.status(500).json({
          message: "Internal server error",
          error: error.message
      });
  }
}

