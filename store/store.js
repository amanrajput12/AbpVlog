import { configureStore } from "@reduxjs/toolkit";
import SingupSlice from "../src/Singup/SingupSlice.js";
import VideoAddSlice from "../src/Admin/VideoAddSlice.js";


const Appstore = configureStore({
    reducer:{
        user:SingupSlice,
        AddVideo:VideoAddSlice
    }
})

export default Appstore