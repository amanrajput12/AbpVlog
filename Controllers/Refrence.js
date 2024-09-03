import { User } from "../Models/UserSchema.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";

export const Refrence = async function (req, res) {
    try {
        const { useremail, refrenceemail,mobileNumber,ifscCode,bankAccountNumber } = req.body;

         
        const userId = req.files.userId[0].path;
     const userPhoto =req.files.userPhoto[0].path;
     const  paymentPhoto=  req.files.paymentPhoto[0].path;

     if(!(useremail,refrenceemail,mobileNumber,ifscCode,bankAccountNumber,userId,userPhoto,paymentPhoto)){
        console.log("all field requird");
        
            return res.status(400).json({
                message:"All Field Are Required",
                sucess:false
            })
     }

    
        // Check if both useremail and refrenceemail exist in the database
        const users = await User.find({
            email: { $in: [useremail, refrenceemail] }
        });

        const validrequest = users.find(data => data.email.toLowerCase() === useremail.toLowerCase());
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
              console.log(req.files.userId[0].path);
              console.log(req.files.userPhoto[0].path);
              console.log(req.files.paymentPhoto[0].path);

              const resultcloud = await Promise.all([
                uploadOnCloudinary(req.files.userId[0].path).then(result => ({ fieldname: 'userId', url: result.secure_url })),
                uploadOnCloudinary(req.files.userPhoto[0].path).then(result => ({ fieldname: 'userPhoto', url: result.secure_url })),
                uploadOnCloudinary(req.files.paymentPhoto[0].path).then(result => ({ fieldname: 'paymentPhoto', url: result.secure_url })),
              ]) 
              console.log("check of result promise",resultcloud);

              if(!resultcloud){
                return res.status(400).json({
                    message:"Error on Upload the image",
                    success:false
                })
             }
              
              const urlimage = {};
              resultcloud.forEach(result => {
            urlimage[result.fieldname] = result.url;
});
console.log('Files uploaded successfully to Cloudinary:', urlimage);
                
    
        // Update user with useremail
        const Myresp = await User.findOneAndUpdate(
            { email: useremail },
            { 
                authId: urlimage.userPhoto || "", // Assuming 'userPhoto' is for authId
                paymentPhoto: urlimage.paymentPhoto || "", // Assuming 'paymentPhoto' is for payment proof
                isrefrence: true ,
                userPhoto:urlimage.userPhoto,
                bankAccountNumber,
                mobileNumber:Number(mobileNumber),
                ifscCode
            },
        );

        // Update user with refrenceemail
        const refrenceupdate = await User.findOneAndUpdate(
            { email: refrenceemail },
            { $push: { references: useremail } }, // Use $push to add to the references array
        );

        

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
