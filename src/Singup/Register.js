import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserInfo } from "./useSingup.js";

export const Register = createAsyncThunk("/user/Register",async function (value) {
     try {
        console.log("value in thunk",value);
      const {token,toast,setLoading} = value
      setLoading("flex")
        const info = await fetchUserInfo(token)        
          console.log("info",info);

          const resp = await fetch("https://abpvlog.onrender.com/v1/user/register",{
            method:"POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({
              email:info.email,
              name:info.name,
              acessToken:token
            })
          })
          const data = await resp.json()
          console.log("on login",data);
          if(!data.success){
            toast.error(data.message)
            setLoading(null)
          }
          if(data.message === "This user Already Exist"){
            toast.error(data.message)
            setLoading(null)
          }
          else if(data.message === "User created Sucessfully"){
            setLoading(null)
            toast.success(data.message)
          }
          else if(data.message === "This user does not exist"){
            toast.error(data.message)
            setLoading(null)
          }
             return data
     } catch (error) {
        console.log("error on register user",error.message);
        toast.error(error.response.data.message)
        setLoading(null)
        
     }
})