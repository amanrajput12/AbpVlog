import { Router } from "express";
import { register } from "../Controllers/UserController.js";


const Userrouter = Router()


Userrouter.route("/register").post(register)

export {Userrouter}