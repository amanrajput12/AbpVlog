import { Router } from "express";

import { deleteuser, Forverify } from "../Controllers/UserController.js";
import { VerifyUser } from "../Controllers/VerifyUser.js";
import { AdminVerify } from "../Middleware/AdminVerify.js";
import { AdminDelete, AdminGetVideo } from "../Controllers/VideoController.js";



const Adminrouter = Router()

// create subscription

Adminrouter.route('/forverify').post(AdminVerify,Forverify)
Adminrouter.route('/profileverify').post(AdminVerify,VerifyUser)
Adminrouter.route('/deleteuser').post(AdminVerify,deleteuser)
Adminrouter.route('/getvideo').get(AdminGetVideo)
Adminrouter.route('/deletevideo').post(AdminDelete)
// Adminrouter.route('/getsub').post(GetSubscription)



export {Adminrouter}