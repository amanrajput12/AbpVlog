import { configureStore } from "@reduxjs/toolkit";
import SingupSlice from "../src/Singup/SingupSlice.js";


const Appstore = configureStore({
    reducer:{
        user:SingupSlice
    }
})

export default Appstore