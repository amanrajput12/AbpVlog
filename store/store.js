import { configureStore } from "@reduxjs/toolkit";
import SingupSlice from "../src/Singup/SingupSlice.js";
import VideoAddSlice from "../src/Admin/VideoAddSlice.js";
import GetSlice from "../src/User/GetSlice.js";
import RegisterSlice from "../src/Singup/RegisterSlice.js";
import VerifyUserSlice from "../src/Admin/VerifyUserSlice.js";


const Appstore = configureStore({
    reducer:{
        user:SingupSlice,
        AddVideo:VideoAddSlice,
        GetVideo:GetSlice,
        Register:RegisterSlice,
        VerifyUser:VerifyUserSlice
    }
})

export default Appstore