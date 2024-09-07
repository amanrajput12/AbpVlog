import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserInfo } from "./useSingup.js";

export const Register = createAsyncThunk("/user/Register",async function (value) {
     try {
        console.log("value in thunk",value);
      const {token,toast} = value
    
        const info = await fetchUserInfo(token)        
          console.log("info",info);

          const resp = await fetch("/v1/user/register",{
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
          const userdata = await resp.json()
          console.log("on login",value);
          if(!userdata.sucess){
            toast.error(userdata.message)
        
          }
          if(userdata.message === "This user Already Exist"){
            toast.error(userdata.message)
          
          }
          else if(userdata.message === "User created Sucessfully"){
         
            toast.success(userdata.message)
          }
          else if(userdata.message === "This user does not exist"){
            toast.error(userdata.message)
            
          }
             return userdata
     } catch (error) {
        console.log("error on register user",error.message);
       
    
        
     }
})