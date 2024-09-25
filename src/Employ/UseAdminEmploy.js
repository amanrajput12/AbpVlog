import { createAsyncThunk } from "@reduxjs/toolkit";



export const AdminEmploy = createAsyncThunk('/employ/get',async function (value) {
    try {
        const data = await fetch("/v1/employ/adminemploy",{
            method:"GET",
           
        })
        const resp = await data.json()
        console.log("in admin employ",resp);
        
         return resp.data

    } catch (error) {
        console.log("error on getting Admin Employ",error.message);
        
    }
})