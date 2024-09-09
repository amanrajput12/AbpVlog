import { Router } from "express";
import { GetWallet, Withdrwal } from "../Controllers/AddWallet.js";
import { checkVerified } from "../Middleware/CheckVerify.js";



const Walletrouter = Router()

Walletrouter.route('/get').post(checkVerified,GetWallet)
Walletrouter.route('/withdaw').post(checkVerified,Withdrwal)


export {Walletrouter}