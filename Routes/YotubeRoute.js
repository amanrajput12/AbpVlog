import { Router } from "express"
import { GetYoutubeCard, YoutubeRegisation } from "../Controllers/Youtube.js"
import { handleMulterError, upload } from "../Middleware/Multer.js";



const Youtuberouter = Router()


Youtuberouter.route("/register").post( upload.single('thumbnail'), 
handleMulterError,YoutubeRegisation)
Youtuberouter.route("/getcard").post(GetYoutubeCard)

export {Youtuberouter}
