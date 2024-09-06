import { User } from "../Models/UserSchema.js";
import { Wallet } from "../Models/WalletSchema.js";

export const AddWallet = async function (userId, timespend) { 
    try {
        console.log(userId, timespend);
        const userdata = await User.findOne({ _id: userId });
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
                const referralBonus = (balanceToAdd * referralPercentage) / 100;
                const referedbyWallet = await Wallet.findOne({ email: referedby.email });

                if (referedbyWallet) {
                    // Update referrer's wallet with the referral bonus
                    const updatedReferralBalance = referedbyWallet.TotalBalance + referralBonus;
                    await Wallet.findOneAndUpdate(
                        { email: referedby.email },
                        { TotalBalance: updatedReferralBalance }
                    );
                    console.log(`Referral bonus of ${referralBonus} added to referrer (${referedby.email})`);
                } else {
                    // Create new wallet entry for the referrer if they don't have a wallet yet
                    await Wallet.create({
                        email: referedby.email,
                        TotalBalance: referralBonus,
                        userId: referedby._id,
                    });
                    console.log(`Referral bonus of ${referralBonus} added for new referrer (${referedby.email})`);
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


export const GetWallet = async function (req,res) {
    try {
        const {userId} = req.body
        console.log("userId",userId,req.body);
        
        const wallet = await Wallet.findOne({userId})
        if(!wallet){
            res.status(400).json({
                message:"No wallet Grant",
                sucess:false,
            })
        }
        if(wallet){
            res.status(200).json({
                message:"Getting wallet sucessfully",
                sucess:true,
                data:wallet
            })
        }
    } catch (error) {
        console.log("error on getting wallet",error.message);
        
    }
}