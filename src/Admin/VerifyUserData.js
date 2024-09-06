import { createAsyncThunk } from "@reduxjs/toolkit";



export const VerifyUserData = createAsyncThunk("/admin/verifyUser",async function (value) {
     try {
         const data = await fetch("/v1/admin/forverify",{
            method:"GET"
         })
         const resp = await data.json()
         console.log("resp data of user",resp);
         return resp
         
     } catch (error) {
            console.log("error on getting user for verify",error.message);
            
     }
})