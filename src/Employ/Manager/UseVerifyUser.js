import { createAsyncThunk } from "@reduxjs/toolkit";


export const UseVerifyUser = createAsyncThunk("/manager/verify",async function getuser(value) {
    try {
        const {employId,location} = value
       const data = await fetch("/v1/manager/userverification",{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({employId,location})
       })
       const resp = await data.json()
       console.log("data in the  manager ",resp);
        return resp.data

    } catch (error) {
      console.log("error on getting the user for verification",error.message);
      
    }
  })