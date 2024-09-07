import {createAsyncThunk} from "@reduxjs/toolkit"
import toast from "react-hot-toast";



export const fetchUserInfo = async (token) => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );
  
      const data = await response.json();
      console.log('User Info:', data);
    return data
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };


const singup = createAsyncThunk("/user/sigup",async(value)=>{
    try { 
      console.log("value in thunk",value);
       const {token,toast,setLoading} = value
       setLoading("flex")
          const info = await fetchUserInfo(token)        
            console.log("info",info);

            const resp = await fetch("/v1/user/login",{
                method:"POST",
                credentials: 'include',
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
              console.log("on register",data);
              if(!data.success){
                toast.error(data.message)
                
                setLoading(null)
              }
              if(data.message == "user Login sucess"){
                toast.success(data.message)
                setLoading(null)
              }
              else if(data.message == "This user does not exist"){
                toast.error(`${data.message} Please Sign Up`)
                setLoading(null)
              }
                 return data
         
    } catch (error) {
        console.log("error on sigup the user",error);
        toast.error(error.response.data.message)
        setLoading(null)
       
        
    }
})

export default singup