import { TimeSpend } from "../Models/TimeSpend.js";

// Create TimeSpend
export const CreateTimespend = async function (req, res) {
    try {
        const { Time, user } = req.body;
        
        if (!Time || !user) {
            return res.status(400).json({
                message: "Time and user are required"
            });
        }

        const resp = await TimeSpend.create({
            Time,
            user
        });

        res.status(201).json({
            message: "Time updated successfully",
            data: resp
        });
    } catch (error) {
        console.log("Error on createTimespend:", error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

// Get TimeSpend
export const GetTimespend = async function (req, res) {
    try {
        const resp = await TimeSpend.find().populate('user');  // Use 'user' instead of 'User'
        
        res.status(200).json({
            message: "TimeSpend retrieved successfully",
            data: resp
        });
    } catch (error) {
        console.log("Error on getting TimeSpend:", error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}
