import { Router } from "express";
import { AddVideo, GetVideo } from "../Controllers/VideoController.js";
import { checkVerified } from "../Middleware/CheckVerify.js";
import { AdminVerify } from "../Middleware/AdminVerify.js";


const VideoRouter = Router()

VideoRouter.route('/admin/add').post(AdminVerify,AddVideo)
VideoRouter.route('/getVideo').post(checkVerified,GetVideo)

export {VideoRouter}