import { createSlice } from "@reduxjs/toolkit";
import { GetAdd } from "./useGetAdds.js";


const AddsSlice = createSlice({
    name:"Adds",
    initialState:{
        Loading:false,
     error:null,
     image:null,
     addsImage:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(GetAdd.pending,(state,action)=>{
          state.Loading=true,
          state.error=null
        })
        .addCase(GetAdd.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.Loading=false,
            
           state.addsImage=action.payload
        })
        .addCase(GetAdd.rejected,(state,action)=>{
         
            
            state.Loading=false,
            state.error=action.payload.error
        })

    }
})

export default AddsSlice.reducer