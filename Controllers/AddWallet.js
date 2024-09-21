import { User } from "../Models/UserSchema.js";
import { Video } from "../Models/VideoSchema.js";
import { Wallet } from "../Models/WalletSchema.js";
import { Mailsend } from "../Utils/Mailsend.js";

export const AddWallet = async function (userId, timespend, videoId) {
  try {
    console.log(userId, timespend);
    const userdata = await User.findOne({ _id: userId });
    const validrequest = await Video.findOne({ videoId });
    if (!validrequest) {
      console.log("It not authorize to give watchtime");

      return { message: "This is not valid" };
    }
    const referdemail = userdata?.referedBy;
    const referedby = await User.findOne({ email: referdemail });
    console.log("in wallet", userdata, " this is referred by", referedby);

    // Determine balance based on gradepay
    let balanceToAdd = 0;
    let referralPercentage = 0;

    if (userdata.gradepay == 1600) {
      console.log("this is for 1600");
      balanceToAdd = 15;
      referralPercentage = 1; // 1% for 1600 gradepay
    } else if (userdata.gradepay == 3100) {
      console.log("this is for 3100");
      balanceToAdd = 30;
      referralPercentage = 1.25; // 1.25% for 3100 gradepay
    } else if (userdata.gradepay == 5100) {
      console.log("this is for 5100");
      balanceToAdd = 50;
      referralPercentage = 1.5; // 1.5% for 5100 gradepay
    }

    if (balanceToAdd > 0) {
      // Handle wallet for the current user
      const alreadyWallet = await Wallet.findOne({ email: userdata.email });
      console.log("check already wallet", alreadyWallet);

      if (alreadyWallet) {
        // Update existing wallet balance by adding the new balance
        const updatedBalance = alreadyWallet.TotalBalance + balanceToAdd;
        await Wallet.findOneAndUpdate(
          { email: userdata.email },
          { TotalBalance: updatedBalance }
        );
        console.log("Wallet updated successfully for user");
      } else {
        // Create new wallet entry for the user
        await Wallet.create({
          email: userdata.email,
          TotalBalance: balanceToAdd,
          userId: userId,
        });
        console.log("Balance added successfully for user");
      }

      // Handle referral bonus if `referedby` exists
      if (referedby) {
        const referralBonus = parseFloat(((balanceToAdd * referralPercentage) / 100).toFixed(2));
        const referedbyWallet = await Wallet.findOne({
          email: referedby.email,
        });

        if (referedbyWallet) {
          // Update referrer's wallet with the referral bonus
          const updatedReferralBalance =
            referedbyWallet.TotalBalance + referralBonus;
          await Wallet.findOneAndUpdate(
            { email: referedby.email },
            { TotalBalance: updatedReferralBalance }
          );
          console.log(
            `Referral bonus of ${referralBonus} added to referrer (${referedby.email})`
          );
        } else {
          // Create new wallet entry for the referrer if they don't have a wallet yet
          await Wallet.create({
            email: referedby.email,
            TotalBalance: referralBonus,
            userId: referedby._id,
          });
          console.log(
            `Referral bonus of ${referralBonus} added for new referrer (${referedby.email})`
          );
        }
      }

      return { message: "Wallet update successful" };
    } else {
      return { message: "Invalid gradepay, balance not added" };
    }
  } catch (error) {
    console.log("Error on adding wallet", error);
    return { message: "Error adding wallet" };
  }
};

export const GetWallet = async function (req, res) {
  try {
    const { userId } = req.body;
    console.log("userId", userId, req.body);

    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      res.status(400).json({
        message: "No wallet Grant",
        sucess: false,
      });
    }
    if (wallet) {
      res.status(200).json({
        message: "Getting wallet sucessfully",
        sucess: true,
        data: wallet,
      });
    }
  } catch (error) {
    console.log("error on getting wallet", error.message);
  }
};

export const Withdrwal = async function (req, res) {
  try {
    const date = new Date().toISOString();
    const { email } = req.body;
    console.log("on withdrawal", email, date);

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        sucess: false,
      });
    }

    // Find the user's wallet by email
    const wallet = await Wallet.findOne({ email }).populate("userId");
      const username =wallet.userId.username
      console.log("on wallet reques",wallet.userId.username);
      
    
    if (!wallet) {
      return res.status(404).json({
        message: "Wallet not found",
        sucess: false,
      });
    }

    if (wallet.TotalBalance <= 200) {
      return res.status(400).json({
        message:
          "Insufficient balance. You need more than 200 to make a withdrawal.",
        sucess: false,
      });
    }

    // Check if a withdrawal request was made in the past 7 days
    if (wallet.withdrwalreq) {
      const lastWithdrwalDate = new Date(wallet.withdrwalreq);
      const currentDate = new Date();
      const timeDifference = currentDate - lastWithdrwalDate;
      const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

      if (timeDifference < sevenDaysInMilliseconds) {
        return res.status(400).json({
          message:
            "Withdrawal request was made within the last 7 days. Please wait.",
          sucess: false,
        });
      }
    }

    // Update the withdrawal request date if the last request was more than 7 days ago
    const resp = await Wallet.findOneAndUpdate(
      { email },
      { withdrwalreq: date },
      { new: true }
    );

    if (resp) {
      const emailContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #4CAF50;">Withdrawal Request Accepted</h2>
        <p>Dear ${username},</p>
        <p>We are pleased to inform you that your withdrawal request has been successfully <strong>accepted</strong>.</p>
        <p>The requested amount will be transferred to your designated account within <strong>7 working days</strong>. Please keep in mind that transfer times may vary depending on your bank.</p>
        
        <p>If you have any questions or require further assistance, feel free to contact our support team at <a href="mailto:bhomiade@bae.org.in">bhomiade@bae.org.in</a>.</p>
        
        <p>Thank you for choosing <em>BHOMI ADVERTISEMENT ENTERPRISE</em>. We appreciate your continued trust and look forward to serving you in the future.</p>
        
        <p style="margin-top: 20px;">Best regards,</p>
        <p><strong>BHOMI ADVERTISEMENT ENTERPRISE</strong></p>
    </div>
`;

// Send a notification email to the organization to inform them about the user's withdrawal request
const orgEmailContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #4CAF50;">Withdrawal Request Notification</h2>
        <p>Dear BHOMI ADVERTISEMENT ENTERPRISE,</p>
        <p>This is to notify you that the user <strong>${username}</strong> (Email: ${email}) has requested a withdrawal.</p>
        <p>Please take the necessary steps to process this request.</p>
        
        <p style="margin-top: 20px;">Best regards,</p>
        <p><strong>System Notification</strong></p>
    </div>
`;

// Send notification to organization
const mailforOrg = await Mailsend(
    "bhomiade@bae.org.in",
    "User Withdrawal Request Notification",
    orgEmailContent
);
console.log("Mail sent to organization", mailforOrg);

// Send confirmation email to user
const mail = await Mailsend(
    email,
    "Your Withdrawal Request Has Been Accepted",
    emailContent
);
console.log("Mail sent to user", mail);


      if(mail){
        res.status(200).json({
            message: "Your withdrawal request is accepted",
            sucess: true,
            data: resp,
          });
      }
    }
    

  
  } catch (error) {
    console.log("Error on withdrawal of the balance", error.message);
    res.status(500).json({
      message: "Error on withdrawal of amount",
      sucess: false,
    });
  }
};

export const AdminWallet = async function (req,res) {
  try {
     const walletdata = await  Wallet.find()
      res.status(200).json({
        message:"Data get Sucess",
        sucess:true,
        data:walletdata
      })

  } catch (error) {
    console.log("error on getting wallet for admin",error.message);
    res.status(500).json({
      message:"Error on getting wallet in admin",
      sucess:false
    })
    
  }
}

export const GrantWithdrwal = async function(req,res){
  try {
     const {email} = req.body 
         console.log(req.body);
         
     const update = await Wallet.findOneAndUpdate(
      {email:email},
      {TotalBalance:0}
     )
     res.status(200).json({
      message:"Wallet update sucess",
      sucess:true,
      data:update
     })
     

  } catch (error) {
    console.log("error on grant withdrwal",error.message);
    res.status(500).json(({
      message:"Error on grant withdrwal",
      sucess:false
    }))
    
  }
}
 