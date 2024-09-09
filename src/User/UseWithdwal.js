import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";



export const Withdwal = createAsyncThunk("/wallet/withdwal",async function (value) {
    const {email,userId,toast,setRequest} = value  
    try {
      console.log(value,email);
      setRequest(true)
      
      const data = await  fetch("/v1/wallet/withdaw", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email,userId })
      });

      const resp = await data.json()
      console.log("on withdwal request",resp);
      if(resp.sucess){
        toast.success(resp.message)
        setRequest(false)
      }
      else if(!resp.sucess){
        toast.error(resp.message)
        setRequest(false)
      }
      
    } catch (error) {
         console.log("error on creating withdwal request",error.message);
                toast.error(error.message)
                setRequest(false)
         
    }
})