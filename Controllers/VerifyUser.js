import { User } from "../Models/UserSchema.js";
import { Wallet } from "../Models/WalletSchema.js";
import { Mailsend } from "../Utils/Mailsend.js";


export const VerifyUser = async function (req,res) {
    try {
        const {email,gradepay} = req.body
        console.log("on verify",email,gradepay);
        
        const user = await User.findOneAndUpdate({email},{
            isVerified:true,
            gradepay:Number(gradepay) 
        })
        if(user){
                  console.log("on verify for add amount",user);
                  const referedemail = user.referedBy;
                  let amount =0;

                  switch (Number(gradepay)) {
                    case 1600:
                        amount = 150;
                        break;
                    case 3100:
                        amount = 300;
                        break;
                    case 5100:
                        amount = 500;
                        break;
                    default:
                        amount = 0; // If no matching gradepay, don't add any amount
                }
                   const refamount = await Wallet.findOneAndUpdate({email:referedemail},{
                   $inc:{TotalBalance:amount}
                   })
  
            const emailContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #4CAF50;">Congratulations, ${user.username}!</h2>
                <p>We are delighted to inform you that your profile has been successfully <strong>verified</strong> on <em>BHOMI ADVERTISEMENT ENTERPRISE</em>. You now have access to all the premium features and benefits reserved for verified users.</p>
                
                <p>If you have any questions or require further assistance, our support team is just an email away. Feel free to reach out to us at <a href="mailto:bhomi.ade@bae.org.in">bhomi.ade@bae.org.in</a>, and we’ll be happy to assist you.</p>
                
                <p>Thank you for being a valued member of our community. We look forward to seeing you make the most of our platform!</p>
                
                <p style="margin-top: 20px;">Best regards,</p>
                <p><strong>BHOMI ADVERTISEMENT ENTERPRISE</strong></p>
            </div>
        `;
        
            const mail = await Mailsend(email," Congratulations! Your Profile Has Been Verified",emailContent)
            console.log("after mail send",mail);
            
            return res.status(201).json({
              message:"User verified sucessfully"
            })
        }
    } catch (error) {
        console.log("error on verifying user",error.message);
        
    }
}