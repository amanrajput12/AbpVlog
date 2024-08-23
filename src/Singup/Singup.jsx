import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import singup from './useSingup'
import { useGoogleLogin } from '@react-oauth/google';


function Singup() {

  const dispatch = useDispatch()



  // Fetch YouTube data after login
  useEffect(() => {
  
  //  subscribeToChannel(accessToken,"UCAuUUnT6oDeKwE6v1NGQxug")
    
  }, []);



  


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
    <div className='flex  flex-col justify-center items-center pt-24'>
      <h2>Login user</h2>
      <button  className='bg-slate-700 p-5 mt-3 rounded-xl hover:bg-slate-600' onClick={() =>login()}>Login</button>
      </div>

     
    </>
  );
}

export default Singup;
