


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useSelector } from 'react-redux';

const VideoPlayer = () => {
  const [timeSpent, setTimeSpent] = useState(0);

  const videoId = useSelector((store)=>store.GetVideo.videoId) 
  // console.log("id of video",videoId);
  
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(timeSpent);
      
      setTimeSpent((prevTime) => prevTime + 1);
    }, 1000);
      
    return () => {
      clearInterval(interval);
      // handleTimeSpent();
    };
  }, [timeSpent]);
    
     
  const handleTimeSpent = async () => {
    try {
      await axios.post('http://localhost:4000/v1/timespend/create', { userId, videoId, timeSpent });
    } catch (error) {
      console.error('Error tracking time spent:', error);
    }
  };

  return (
    <div>
      <video src={`https://www.youtube.com/watch?v=PqDMJ7cJvNY`} controls />
    </div>
  );
};

export default VideoPlayer;
