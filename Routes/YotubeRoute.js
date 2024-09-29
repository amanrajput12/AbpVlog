import { Router } from "express"
import { YoutubeRegisation } from "../Controllers/Youtube.js"




const Youtuberouter = Router()

Youtuberouter.route("/register").post(YoutubeRegisation)

export {Youtuberouter}
