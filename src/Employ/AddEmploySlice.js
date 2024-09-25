import { createSlice } from "@reduxjs/toolkit";
import { CreateEmploy } from "./UseAddEmploy.js";
import { AdminEmploy } from "./UseAdminEmploy.js"; // Assuming this is where AdminEmploy is defined

const AddEmploySlice = createSlice({
  name: "AddEmploy",
  initialState: {
    loading: false,
    createEmployerror:null,
    Adminerror: null,
    CreateEmploy: false,
    AdminData: [],  // Add a new state to store the admin data
    AdminLoading: false, // State to manage loading for AdminEmploy
  },
  reducers: {},
  extraReducers: (builder) => {
    // CreateEmploy actions
    builder
      .addCase(CreateEmploy.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(CreateEmploy.fulfilled, (state, action) => {
        state.loading = false;
        state.CreateEmploy = true;
      })
      .addCase(CreateEmploy.rejected, (state, action) => {
        state.loading = false;
        state.createEmployerror  = action.payload?.error;
      });

    // AdminEmploy actions
    builder
      .addCase(AdminEmploy.pending, (state, action) => {
        state.AdminLoading = true;
      })
      .addCase(AdminEmploy.fulfilled, (state, action) => {
        state.AdminLoading = false;
        state.AdminData = action.payload; // Store the admin data here
      })
      .addCase(AdminEmploy.rejected, (state, action) => {
        state.AdminLoading = false;
        state.Adminerror = action.payload?.error;
      });
  },
});

export default AddEmploySlice.reducer;
