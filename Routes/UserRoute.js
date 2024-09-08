import { Router } from "express";
import { login, register } from "../Controllers/UserController.js";
import { SubscibeChannel } from "../Middleware/SubscribeChannel.js";

import { checklogin } from "../Middleware/Checklogin.js";


const Userrouter = Router()


Userrouter.route("/register").post(SubscibeChannel,register)
Userrouter.route("/login").post(checklogin,login)

export {Userrouter}