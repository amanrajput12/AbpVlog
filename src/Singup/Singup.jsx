import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import singup from './useSingup'
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const accessToken = Cookies.get('accessToken');
const userId = Cookies.get('userId');

function Singup() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // console.log(logincheck);
     
  // Fetch YouTube data after login
  useEffect(() => {
    if (accessToken && userId) {
      // If both are present, navigate to the video section
      navigate('/video');
    } 
  //  subscribeToChannel(accessToken,"UCAuUUnT6oDeKwE6v1NGQxug")
    
  }, [accessToken,userId]);



  


  const fetchYouTubeData = async (token) => {
    try {
      const response = await fetch(
        'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      
        const data = await response.json();
        console.log('YouTube Data:', data);
      
     
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
    }
  };

  const fetchSubsription = async (token) => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/youtube/v3/channels?part=id&mine=true',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      
        const data = await response.json();
        console.log('Sbscription Data:', data);
      
     
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
    }
  };


  const subscribeToChannel = async (token, channelId) => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/youtube/v3/subscriptions?part=snippet',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            snippet: {
              resourceId: {
                kind: 'youtube#channel',
                channelId: channelId,
              },
            },
          }),
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(`Successfully subscribed to channel ID: ${channelId}`);
        console.log('Subscription Data:', data);
      } else {
        console.error('Error subscribing to channel:', data);
      }
    } catch (error) {
      console.error('Error subscribing to channel:', error);
    }
  };
  

  // console.log(accessToken);
  
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Access Token:', tokenResponse);
      dispatch(singup(tokenResponse.access_token))
   
    },
    scope: 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.force-ssl ', // Request the YouTube scope
  }); 
  return (
    <>
  <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md flex flex-col justify-center xl:shadow-2xl  p-8 xl:max-w-2xl xl:h-[50vh] rounded-3xl w-full transition-shadow duration-300"> 
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
          <p className="text-gray-600">Sign in to continue</p>
        </div>

        <button
          onClick={() => login()}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center"
        >
          <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.35 11.1h-9.4v2.65h5.5c-.25 1.35-.95 2.5-1.95 3.3v2.7h3.15c1.85-1.7 2.9-4.15 2.9-6.95 0-.45-.05-.9-.1-1.35z" />
            <path d="M12 22c2.7 0 4.95-1 6.6-2.65l-3.15-2.7c-.85.6-1.9.95-3.05.95-2.35 0-4.35-1.55-5.05-3.65H4.05v2.75C5.7 19.9 8.7 22 12 22z" />
            <path d="M6.95 14.95c-.25-.6-.4-1.3-.4-1.95s.15-1.35.4-1.95V8.25H4.05C3.4 9.55 3 11.2 3 13s.4 3.45 1.05 4.75l2.9-2.8z" />
            <path d="M12 6.75c1.3 0 2.45.45 3.35 1.35l2.5-2.5C16.95 3.85 14.7 2.75 12 2.75 8.7 2.75 5.7 4.85 4.05 8.25l2.9 2.8c.7-2.1 2.7-3.65 5.05-3.65z" />
          </svg>
          Sign in with Google
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </div>
      </div>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        &copy; 2024 YourCompany. All rights reserved.
      </footer>
    </div>

     
    </>
  );
}

export default Singup;
