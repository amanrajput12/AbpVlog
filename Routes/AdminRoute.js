import { Router } from "express";
import { CreateSubscription, GetSubscription } from "../Controllers/Subscription.js";
import { Forverify } from "../Controllers/UserController.js";



const Adminrouter = Router()

// create subscription
Adminrouter.route('/add').post(CreateSubscription)
Adminrouter.route('/forverify').get(Forverify)
Adminrouter.route('/getsub').post(GetSubscription)



export {Adminrouter}