import { createSlice } from "@reduxjs/toolkit";
import { GetVideo } from "./UseGetVideo.js";



const GetSlice = createSlice({
    name:"GetVideo",
    initialState:{
    loading:false,
        error:null,
        data:[],
        videoId:null
    },
    reducers:{
        addvideoId:(state,action)=>{
               state.videoId = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(GetVideo.pending,(state)=>{
            state.loading=true
        })
        .addCase(GetVideo.fulfilled,(state,action)=>{
            state.loading=false,
            state.data=action.payload
        })
        .addCase(GetVideo.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
    }
})


export const  {addvideoId} = GetSlice.actions
export default  GetSlice.reducer