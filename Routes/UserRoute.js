import { Router } from "express";
import { login, register } from "../Controllers/UserController.js";
import { SubscibeChannel } from "../Middleware/SubscribeChannel.js";
import { checkVerified } from "../Middleware/CheckVerify.js";


const Userrouter = Router()


Userrouter.route("/register").post(SubscibeChannel,register)
Userrouter.route("/login").post(login)

export {Userrouter}