import { createAsyncThunk } from "@reduxjs/toolkit";


export const GetVideo = createAsyncThunk("/video/Userdata",async function(value){
    try {
         const resp = await fetch("https://abpvlog.onrender.com/v1/Video/getVideo",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:"rajputaman724857@gmail.com"})
            
         })

         const data = await resp.json()
         console.log("vide data",data);
         
         return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
})