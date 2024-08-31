import { createSlice } from "@reduxjs/toolkit";
import { Register } from "./Register.js";


const RegisterSlice = createSlice({
    name:"Register",
    initialState:{
        loading:false,
        error:null,
        register:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(Register.pending,(state)=>{
            state.loading=true
        }) 
        .addCase(Register.fulfilled,(state,action)=>{
            state.loading=false,
            state.register=true
        })
        .addCase(Register.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload.error
        })
    }
})
 
export default RegisterSlice.reducer