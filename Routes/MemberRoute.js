import { Router } from "express";
import { currentMember } from "../Controllers/CurrentMember.js";


const Memberrouter = Router()

Memberrouter.route('/get').get(currentMember)

export {Memberrouter}