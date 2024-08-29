import {createAsyncThunk} from "@reduxjs/toolkit"



const fetchUserInfo = async (token) => {
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
          const info = await fetchUserInfo(value)        
            console.log("info",info);

            const resp = await fetch("https://abpvlog.onrender.com/v1/user/register",{
                method:"POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                  email:info.email,
                  name:info.name,
                  acessToken:value
                })
              })
              const data = await resp.json()
              console.log("on register",data);
                 return data
         
    } catch (error) {
        console.log("error on sigup the user",error.message);
        
    }
})

export default singup