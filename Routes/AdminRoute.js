import { Router } from "express";

import { Forverify } from "../Controllers/UserController.js";
import { VerifyUser } from "../Controllers/VerifyUser.js";



const Adminrouter = Router()

// create subscription

Adminrouter.route('/forverify').get(Forverify)
Adminrouter.route('/profileverify').post(VerifyUser)
// Adminrouter.route('/getsub').post(GetSubscription)



export {Adminrouter}