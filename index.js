import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./Database/Database.js";
import { Userrouter } from "./Routes/UserRoute.js";
import cors from "cors";
import { VideoRouter } from "./Routes/VideoRoute.js";
import { TimeSpendrouter } from "./Routes/TimeSpendRoute.js";
import { Teamrouter } from "./Routes/TeamRoute.js";
import { Refrencerouter } from "./Routes/RefrenceRoute.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
connectDb();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: ['https://apbvlogs.netlify.app','http://localhost:5173'],
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static('Public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Register routers
app.use("/v1/user", Userrouter);
app.use("/v1/Video", VideoRouter);
app.use("/v1/timespend", TimeSpendrouter);
app.use("/v1/team", Teamrouter);
app.use("/v1/refrence", Refrencerouter);

app.get("/", (req, res) => {
    console.log("Monitoring the application");
    res.send("<h2>Hello App</h2>");
});

app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
});