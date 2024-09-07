import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import toast, { Toaster } from 'react-hot-toast';
import singup from '../Singup/useSingup.js';
import Cookies from "js-cookie"

const Loginbtn = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
//   const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'));
//   const [userId, setUserId] = useState(Cookies.get('myid'));    

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
          dispatch(singup({ token: tokenResponse.access_token,toast:toast }));
        },
        scope: 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.force-ssl',
        redirectUri: 'https://bae.org.in', // Ensure this matches what’s registered in Google Cloud
      });

  return (
       <div>     
         <button  onClick={() => login()} className='p-2 bg-gradient-to-tr from-cyan-400 to-cyan-950 rounded-sm hover:animate-snakeBorder'>
      Login
      </button>
      <Toaster/>
      </div>

   
  )
}

export default Loginbtn
