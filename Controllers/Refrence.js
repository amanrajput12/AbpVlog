import { User } from "../Models/UserSchema.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";

export const Refrence = async function (req, res) {
    try {
        const { useremail, refrenceemail,mobileNumber,ifscCode,bankAccountNumber } = req.body;
        const empId = req.body.empId || null ;
            const userEmail = useremail.toLowerCase();
            const refrenceEmail = refrenceemail.toLowerCase();
               console.log("email ",userEmail,refrenceEmail);
               
    
     const  paymentPhoto=  req.file.path;

     if(!(useremail,refrenceemail,mobileNumber,ifscCode,bankAccountNumber,paymentPhoto)){
        console.log("all field requird");
        
            return res.status(400).json({
                message:"All Field Are Required",
                sucess:false
            })
     }

    
        // Check if both useremail and refrenceemail exist in the database
        const users = await User.find({
            email: { $in: [userEmail, refrenceEmail] }
        });
         
          
        const validrequest = users.find(data => data.email === userEmail);
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
             
              console.log(req.file.path);
      
              const result = await uploadOnCloudinary(req.file.path);
               
           
              if(!result.url){
                return res.status(400).json({
                    message:"Error on Upload the image",
                    success:false
                })
             }
              
    
        // Update user with useremail
        const Myresp = await User.findOneAndUpdate(
            { email: userEmail },
            { 
                
                paymentPhoto:result.url,
                isrefrence: true ,
             
                bankAccountNumber,
                mobileNumber:Number(mobileNumber),
                ifscCode,
                referedBy:refrenceEmail,
                empId
                
            },
        );
         
        // Update user with refrenceemail
        const refrenceupdate = await User.findOneAndUpdate(
            { email: refrenceEmail },
            { $push: { references: userEmail } }, // Use $push to add to the references array
        );

        if(refrenceupdate.empId){
            const employupdate = await User.findOneAndUpdate(
                {MainempId: refrenceupdate.empId },
                { $push: { references: userEmail } }, // Use $push to add to the references array
            );
            console.log("for employ check",employupdate);
            
        }
    //    console.log("check refrenceupdate",refrenceupdate);
       
        

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
