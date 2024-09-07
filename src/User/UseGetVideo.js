import { createAsyncThunk } from "@reduxjs/toolkit";


export const GetVideo = createAsyncThunk("/video/Userdata",async function(userId){
    try {
         const resp = await fetch("/v1/Video/getVideo",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userId})
            
         })

         const data = await resp.json()
         console.log("vide data",data);
         
         return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
})