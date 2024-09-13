import { Router } from "express";
import { AdminWallet, GetWallet, GrantWithdrwal, Withdrwal } from "../Controllers/AddWallet.js";
import { checkVerified } from "../Middleware/CheckVerify.js";



const Walletrouter = Router()

Walletrouter.route('/get').post(checkVerified,GetWallet)
Walletrouter.route('/withdaw').post(checkVerified,Withdrwal)
Walletrouter.route('/adminwallet').get(AdminWallet)
Walletrouter.route('/change').post(GrantWithdrwal)


export {Walletrouter}