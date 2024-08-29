
import express from "express"
import dotev from "dotenv"
import { connectDb } from "./Database/Database.js"
import { Userrouter } from "./Routes/UserRoute.js"
import cors from "cors"
import { VideoRouter } from "./Routes/VideoRoute.js"
import { TimeSpendrouter } from "./Routes/TimeSpendRoute.js"
const app = express()
dotev.config()
connectDb()
const PORT =process.env.PORT || 4000
app.use(cors({
    origin: 'https://apbvlogs.netlify.app',

}))
app.use(express.json())
app.use("/v1/user",Userrouter)
app.use("/v1/Video",VideoRouter)
app.use("/v1/timespend",TimeSpendrouter)
app.get("/",(req,res)=>{
    res.send("<h2>Hello App</h2>")
})

app.listen(PORT,()=>{
    console.log("App is listen at port 400");
    
})