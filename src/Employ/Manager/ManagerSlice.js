import { createSlice } from "@reduxjs/toolkit";
import { UseVerifyUser } from "./UseVerifyUser.js";


const ManagerSlice = createSlice({
    name:"Manager",
    initialState:{
        UserLoading:false,
        userError:null,
        UserData:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(UseVerifyUser.pending,(state,action)=>{
            state.UserLoading=true
        })
        .addCase(UseVerifyUser.fulfilled,(state,action)=>{
            state.UserData=action.payload
        })
        .addCase(UseVerifyUser.rejected,(state,action)=>{
            state.userError=action.payload.error
        })
    }
})


export default ManagerSlice.reducer