import { Router } from "express";
import { GetWallet } from "../Controllers/AddWallet.js";
import { checkVerified } from "../Middleware/CheckVerify.js";



const Walletrouter = Router()

Walletrouter.route('/get').post(checkVerified,GetWallet)


export {Walletrouter}