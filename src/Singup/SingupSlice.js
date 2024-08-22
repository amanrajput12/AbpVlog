import { createSlice } from "@reduxjs/toolkit";
import singup from "./useSingup.js";


const SingupSlice = createSlice({
    name:"user",
    initialState:{
        loading:false,
        error:null,
        data:{},
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(singup.pending,(state)=>{
            state.loading = true,
             state.error= null
        })
        .addCase(singup.fulfilled,(state,action)=>{
            
            state.loading = false,
            state.data = action.payload
        })
        .addCase(singup.rejected,(state,action)=>{
            state.loading = fasle,
            state.error=action.payload.error
        })
    }
})

export default SingupSlice.reducer