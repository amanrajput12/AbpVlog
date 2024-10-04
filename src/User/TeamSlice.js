import { createSlice } from "@reduxjs/toolkit";
import { TeamWallet } from "./UseTeamWallet.js";



const TeamSlice = createSlice({
    name:"Team",
    initialState:{
        loading:false,
        error:null,
        data:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(TeamWallet.pending,(state,action)=>{
            state.loading =true,
            state.error= null
        })
        .addCase(TeamWallet.fulfilled,(state,action)=>{
            state.loading=false,
            state.data =action.payload
        })
        .addCase(TeamWallet.rejected,(state,action)=>{
            sate.loading=false,
            stae.error=action.payload.error
        })
    }
})

export default TeamSlice.reducer