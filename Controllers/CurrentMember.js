import { CurrentMember } from "../Models/CurrentMember.js";

// Function to get current members
export const currentMember = async function (req, res) {
    try {
        const Member = await CurrentMember.find({});
            console.log("in member",Member);
            
        res.status(200).json({
            message: "Get member",
            success: true,
            Member
        });
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({
            message: "Error on Getting Current Member",
            success: false
        });
    }
}

// Function to increase member count by 2000
export const IncreaseMember = async function () {
    try {
        const valueincrease = Math.round(Math.random()*50+1)
        console.log("value",valueincrease);
        
        const result = await CurrentMember.updateOne({}, { $inc: { Member: valueincrease } });

        if (result.modifiedCount > 0) {
            console.log("Member count increased by 2000");
        } else {
            console.log("No members found to update");
        }
    } catch (error) {
        console.error("Error increasing member count:", error.message);
    }
};


// create()

// Set an interval to run IncreaseMember every hour
const startIncreaseMemberInterval = () => {
    setInterval(() => {
        IncreaseMember();
    },60*60*1000); // 1 hour in milliseconds
}

// Call the function to start the interval
startIncreaseMemberInterval();
