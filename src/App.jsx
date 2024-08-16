import { useEffect, useState } from 'react';
import './App.css';
import { useGoogleLogin } from '@react-oauth/google';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [videos, setVideos] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Access Token:', tokenResponse);
      setAccessToken(tokenResponse.access_token);
    },
    scope: 'https://www.googleapis.com/auth/youtube.readonly', // Request the YouTube scope
  });

  // Fetch YouTube data after login
  useEffect(() => {
    if (accessToken) {
      fetchYouTubeData(accessToken);
      fetchSubsription(accessToken)
    }
  }, [accessToken]);

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

  return (
    <>
      <h2>Login</h2>
      <button onClick={() => login()}>Login</button>

     
    </>
  );
}

export default App;
