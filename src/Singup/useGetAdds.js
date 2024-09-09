import { createAsyncThunk } from "@reduxjs/toolkit";


export const GetAdd = createAsyncThunk("/user/GetAdd",async function (value) {
    try {
        const add = await fetch("/v1/adds/get",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
              },
        })
        const resp = await add.json()
        const addImages = resp.data.map((item)=>item.AddImage)
        console.log("adds are",addImages);
        return addImages
        
    } catch (error) {
         console.log("Error on geting adds",error.message);
         
    }
})
