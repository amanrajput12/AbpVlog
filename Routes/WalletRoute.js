import { Router } from "express";
import { GetWallet } from "../Controllers/AddWallet.js";



const Walletrouter = Router()

Walletrouter.route('/get').post(GetWallet)


export {Walletrouter}