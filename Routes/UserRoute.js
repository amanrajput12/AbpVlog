import { Router } from "express";
import { login, register } from "../Controllers/UserController.js";


const Userrouter = Router()


Userrouter.route("/register").post(register)
Userrouter.route("/login").post(login)

export {Userrouter}