
import express from "express"
import dotev from "dotenv"
import { connectDb } from "./Database/Database.js"
import { Userrouter } from "./Routes/UserRoute.js"
import cors from "cors"
const app = express()
dotev.config()
connectDb()
app.use(cors({
    origin: 'http://localhost:5173',

}))
app.use(express.json())
app.use("/v1/user",Userrouter)
app.get("/",(req,res)=>{
    res.send("<h2>Hello App</h2>")
})

app.listen("4000",()=>{
    console.log("App is listen at port 400");
    
})