import { configureStore } from "@reduxjs/toolkit";
import SingupSlice from "../src/Singup/SingupSlice.js";
import VideoAddSlice from "../src/Admin/VideoAddSlice.js";
import GetSlice from "../src/User/GetSlice.js";


const Appstore = configureStore({
    reducer:{
        user:SingupSlice,
        AddVideo:VideoAddSlice,
        GetVideo:GetSlice
    }
})

export default Appstore