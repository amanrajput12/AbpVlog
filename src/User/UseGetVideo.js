import { createAsyncThunk } from "@reduxjs/toolkit";


export const GetVideo = createAsyncThunk("/video/Userdata",async function(value){
    try {
         const resp = await fetch("https://abpvlog.onrender.com/v1/Video/getVideo",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }
         })

         const data = await resp.json()
         console.log("vide data",data);
         
         return data
    } catch (error) {
        
    }
})