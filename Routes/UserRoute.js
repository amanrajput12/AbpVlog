import { Router } from "express";
import { login, register } from "../Controllers/UserController.js";
import { SubscibeChannel } from "../Middleware/SubscribeChannel.js";

import { checklogin } from "../Middleware/Checklogin.js";
import { Team } from "../Controllers/Team.js";


const Userrouter = Router()


Userrouter.route("/register").post(SubscibeChannel,register)
Userrouter.route("/login").post(SubscibeChannel,checklogin,login)
Userrouter.route("/team").post(Team)

export {Userrouter}