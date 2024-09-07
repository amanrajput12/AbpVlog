import React from 'react'
import {Register} from '../Singup/Register';
import { useGoogleLogin } from '@react-oauth/google';
import toast, { Toaster } from 'react-hot-toast';
const Signupbtn = () => {
    const handleRegister = useGoogleLogin({
        onSuccess: (tokenResponse) => {
          dispatch(Register({ token: tokenResponse.access_token,toast:toast }));
        },
        scope: 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.force-ssl',
        redirectUri: 'https://bae.org.in', // Esure this matches what’s registered in Google Cloud
      });
  return (<div>  <button onClick={handleRegister} className='p-2 bg-gradient-to-tr from-cyan-400 to-cyan-950 rounded-sm hover:animate-snakeBorder'>
    Signup
   </button>
   <Toaster/>
   </div>
 
  )
}

export default Signupbtn
