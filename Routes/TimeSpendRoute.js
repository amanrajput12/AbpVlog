import { Router } from "express";
import { CreateTimespend, GetTimespend } from "../Controllers/TimeSpend.js";


const TimeSpendrouter =Router()


TimeSpendrouter.route("/create").post(CreateTimespend)
TimeSpendrouter.route("/get").get(GetTimespend)

export {TimeSpendrouter}