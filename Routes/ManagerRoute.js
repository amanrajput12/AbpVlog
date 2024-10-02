import { Router } from "express";
import { ManagerVerifyuser } from "../Controllers/Manager.js";


const Managerroute = Router()

Managerroute.route("/userverification").post(ManagerVerifyuser)


export {Managerroute}