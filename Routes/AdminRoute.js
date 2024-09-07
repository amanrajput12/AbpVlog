import { Router } from "express";

import { Forverify } from "../Controllers/UserController.js";
import { VerifyUser } from "../Controllers/VerifyUser.js";
import { AdminVerify } from "../Middleware/AdminVerify.js";



const Adminrouter = Router()

// create subscription

Adminrouter.route('/forverify').post(AdminVerify,Forverify)
Adminrouter.route('/profileverify').post(AdminVerify,VerifyUser)
// Adminrouter.route('/getsub').post(GetSubscription)



export {Adminrouter}