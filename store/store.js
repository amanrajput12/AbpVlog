import { configureStore } from "@reduxjs/toolkit";
import SingupSlice from "../src/Singup/SingupSlice.js";
import VideoAddSlice from "../src/Admin/VideoAddSlice.js";
import GetSlice from "../src/User/GetSlice.js";
import RegisterSlice from "../src/Singup/RegisterSlice.js";
import VerifyUserSlice from "../src/Admin/VerifyUserSlice.js";
import AddsSlice from "../src/Singup/AddsSlice.js";
import AddEmploySlice from "../src/Employ/AddEmploySlice.js";
import ManagerSlice from "../src/Employ/Manager/ManagerSlice.js";


const Appstore = configureStore({
    reducer:{
        user:SingupSlice,
        AddVideo:VideoAddSlice,
        GetVideo:GetSlice,
        Register:RegisterSlice,
        VerifyUser:VerifyUserSlice,
        Adds:AddsSlice,
        Employ:AddEmploySlice,
        Manager:ManagerSlice
    }
})

export default Appstore