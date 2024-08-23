import { Router } from "express";
import { AddVideo, GetVideo } from "../Controllers/VideoController.js";


const VideoRouter = Router()

VideoRouter.route('/admin/add').post(AddVideo)
VideoRouter.route('/getVideo').post(GetVideo)

export {VideoRouter}