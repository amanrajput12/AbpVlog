import { createSlice } from "@reduxjs/toolkit";
import signup from "./useSingup.js";
import Cookies from "js-cookie";

const SignupSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    data: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        console.log('Action Payload:', action.payload);

        const accessToken = action.payload?.data?.acessToken;
        const Id = action.payload.data._id;
        const userRole = action?.payload?.data?.role;

        console.log('AccessToken:', accessToken);
        console.log('UserId:', Id);
        console.log('UserRole:', userRole);

        if (!(accessToken && Id)) {
          console.error("Access token or user ID not found in payload.");
          return;
        }

        // Convert 55 minutes to a fraction of a day (55/1440)
        const expires = 55 / 1440;

        // Set cookies with the correct expiration time
        Cookies.set('myid',Id,{expires:4})
        Cookies.set('accessToken', accessToken, { expires });
     
        if (userRole === "admin") {
          Cookies.set('userRole', userRole, { expires });
        }

        state.loading = false;
        state.data = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default SignupSlice.reducer;
