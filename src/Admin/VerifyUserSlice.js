import { createSlice } from "@reduxjs/toolkit";
import { VerifyUserData } from "./VerifyUserData.js";

const VerifyUserSlice = createSlice({
   name:"VerifyUser",
   initialState:{
    loading:false,
    error:null,
    data:[],  // Ensure you're using `data` if your component references `user.data`
    showImage:null,
    Verification:{}
   } ,
   reducers:{
    viewImage:(state, action) => {  // Keep the name as ViewImage
        state.showImage = action.payload;
    },
    userVerfication:(state,action)=>{
      state.Verification=action.payload
    }
   },
   extraReducers: (builder) => {
     builder.addCase(VerifyUserData.pending, (state) => {
        state.loading = true;
     })
     .addCase(VerifyUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
     })
     .addCase(VerifyUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
     });
   }
});

export const { viewImage,userVerfication } = VerifyUserSlice.actions;  // Export as ViewImage
export default VerifyUserSlice.reducer;
