import { createSlice } from "@reduxjs/toolkit";
import VideoAdd from "./useVideoAdd.js";



const VideoAddSlice = createSlice({
    name:"VideoAdd",
    initialState:{
        loading:false,
        toast:null,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
           builder.addCase(VideoAdd.pending,(state)=>{
            state.pending=true,
            state.error=null
           })
           .addCase(VideoAdd.fulfilled,(state,action)=>{
            state.pending= false,
            state.toast ="video Add Sucessfully"
            console.log("on ading slice",action.payload)
            
           })
           .addCase(VideoAdd.rejected,(state,action)=>{
            state.pending=false,
            state.error= action.payload.error
           })
    }
})

export default VideoAddSlice.reducer