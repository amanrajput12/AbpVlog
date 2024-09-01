import { User } from "../Models/UserSchema.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";

export const Refrence = async function (req, res) {
    try {
        const { useremail, refrenceemail } = req.body;

        // Check if both useremail and refrenceemail exist in the database
        const users = await User.find({
            email: { $in: [useremail, refrenceemail] }
        });

        const validrequest = users.find((data) => data.email === useremail);
        if (validrequest?.isrefrence) {
            return res.status(401).json({
                message: "This user is already registered",
                success: false
            });
        }

        if (users.length < 2) {
            return res.status(400).json({
                message: "Provided Email is not valid",
                success: false
            });
        }

        // Upload files to Cloudinary and extract the URLs
        const uploadResults = await Promise.all(
            Object.values(req.files).flat().map(async (file) => {
                const result = await uploadOnCloudinary(file.path);
                return { fieldname: file.fieldname, url: result.secure_url };
            })
        );
             if(!uploadResults){
                return res.status(400).json({
                    message:"Error on Upload the image",
                    success:false
                })
             }
        // Map upload results to the respective fields
        const urls = {};
        uploadResults.forEach(result => {
            urls[result.fieldname] = result.url;
        });

        // Update user with useremail
        const Myresp = await User.findOneAndUpdate(
            { email: useremail },
            { 
                authId: urls.userPhoto || "", // Assuming 'userPhoto' is for authId
                paymentPhoto: urls.paymentPhoto || "", // Assuming 'paymentPhoto' is for payment proof
                isrefrence: true ,
                userPhoto:urls.userPhoto
            },
            { new: true } // To return the updated document
        );

        // Update user with refrenceemail
        const refrenceupdate = await User.findOneAndUpdate(
            { email: refrenceemail },
            { $push: { references: useremail } }, // Use $push to add to the references array
            { new: true } // To return the updated document
        );

        console.log("Files uploaded successfully to Cloudinary:", urls);

        res.status(200).json({
            message: "Reference created successfully",
           success: true,
        
        });

    } catch (error) {
        console.log("Error creating reference:", error.message);
        res.status(500).json({
            message: "Error creating reference",
            error: error.message,
            success: false
        });
    }
};
