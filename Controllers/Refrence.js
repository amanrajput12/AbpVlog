import { User } from "../Models/UserSchema.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";

export const Refrence = async function (req, res) {
    try {
        const { useremail, refrenceemail } = req.body;

        // Check if both useremail and refrenceemail exist in the database
        const users = await User.find({
            email: { $in: [useremail, refrenceemail] }
        });
             console.log("on check",users);
             const validrequest = users.find((data) => data.email === useremail);
             console.log("for filter",validrequest);
               if(validrequest.isrefrence){
                return res.status(401).json({
                    message:"This user already register",
                    success:false
                })
               }
        if (users.length < 2) {
            return res.status(400).json({
                message: "Provided Email is not valid",
                success: false
            });
        }

        // Upload file to Cloudinary
        const data = await uploadOnCloudinary(req.file.path);

        if (!data || !data.url) {
            throw new Error("Failed to upload image to Cloudinary");
        }

        // Update user with useremail
        const Myresp = await User.findOneAndUpdate(
            { email: useremail },
            { authId: data.url, isrefrence: true },
            { new: true } // To return the updated document
        );

        // Update user with refrenceemail
        const refrenceupdate = await User.findOneAndUpdate(
            { email: refrenceemail },
            { $push: { references: useremail } }, // Use $push to add to the references array
            { new: true } // To return the updated document
        );

        console.log("File uploaded successfully to Cloudinary:", data.url);

        res.status(200).json({
            message: "Reference created successfully",
            fileUrl: data.url,
            success: true,
            refrenceupdate,
            Myresp
        });

    } catch (error) {
        console.log("Error creating reference:", error.message);
        res.status(500).json({
            message: "Error creating reference",
            error: error.message,
            success: false
        });
    }
}
