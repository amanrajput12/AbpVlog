import { Router } from "express";
import { CreateTimespend, GetTimespend } from "../Controllers/TimeSpend.js";
import { checkVerified } from "../Middleware/CheckVerify.js";


const TimeSpendrouter =Router()


TimeSpendrouter.route("/create").post(checkVerified,CreateTimespend)
TimeSpendrouter.route("/get").get(GetTimespend)

export {TimeSpendrouter}