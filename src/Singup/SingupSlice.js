import { createSlice } from "@reduxjs/toolkit";
import signup from "./useSingup.js";
import Cookies from "js-cookie";


const SignupSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    data: {},
    sucess:false
  },
  reducers: {
    logout:(state,action)=>{
      state.sucess = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

.addCase(signup.fulfilled,(state,action)=>{
  const value = new Date(Date.now() + 55 * 60 * 1000)
  state.loading=false,
  state.data=action.payload,
  state.error=null,
    //  const accessToken = action.payload?.data?.acessToken,
    //      const userRole = action?.payload?.data?.role;
    //      const usergetId = action?.payload?.userId;
    Cookies.set('myid',action?.payload?.userId,{expires:value})
     Cookies.set('accessToken', action.payload?.data?.acessToken, { expires:value });
   
     if (action?.payload?.data?.role === "admin") {
      Cookies.set('userRole', action?.payload?.data?.role, { expires:value });
     }
     state.sucess=true
})

      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
       },
});


export const {logout} = SignupSlice.actions

export default SignupSlice.reducer;
