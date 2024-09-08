import { createSlice } from "@reduxjs/toolkit";
import { Register } from "./Register.js";



const RegisterSlice = createSlice({
    name:"Register",
    initialState:{
        loading:false,
        error:null,
        register:false
    },
    reducers:{
        RegisterSucess:(state,action)=>{
            state.register=false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(Register.pending,(state)=>{
            state.loading=true
        }) 
        .addCase(Register.fulfilled,(state,action)=>{
            state.loading=false
                 if(action.payload.sucess){
            state.register=true
                 }
            
        })
        .addCase(Register.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload.error
        })
    }
})
 
export const {RegisterSucess} = RegisterSlice.actions
export default RegisterSlice.reducer