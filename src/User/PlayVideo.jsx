import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from "js-cookie"
const VideoPlayer = () => {
  const playerRef = useRef(null);
  const [realTimeSpent, setRealTimeSpent] = useState(0);
  const [requiredTimetowatch, setRequiredTimetowatch] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [VideoDuration,setVideoDuration] = useState(0)
  const Id = useSelector((store) => store.GetVideo.videoId);
  const [userId, setUserId] = useState(Cookies.get('myid'));
               
  // Calculate required time efficiently outside useEffect
  const calculateRequiredTime = useCallback(() => {
    const videoDuration = playerRef.current?.getDuration() || 0;
    setVideoDuration(videoDuration)
    return Number(videoDuration - (videoDuration / 4));
  }, [playerRef]);

  useEffect(() => {
    setRequiredTimetowatch(calculateRequiredTime());

    // Clear any existing interval on unmount or video pause
    return () => clearInterval(intervalId);
  }, [isPlaying, calculateRequiredTime]); // Only update on isPlaying or duration change

  const intervalId = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      intervalId.current = setInterval(() => {
        console.log('value',realTimeSpent);
        
        setRealTimeSpent((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId.current);
      console.log("after pause",realTimeSpent);
      
      intervalId.current = null; // Reset to avoid memory leaks
    }

    // Clean up when component unmounts
    return () => clearInterval(intervalId.current);
  }, [isPlaying]); // Only update on isPlaying change

  const sendTimeSpent = async (timeSpent) => {
    try {
      console.log("userId",userId);
      
      const time = Math.round(timeSpent)
   
      const data = await fetch("/v1/timespend/create",{
        method:"POST",
        headers:{
           "Content-Type":"application/json"
        },
        body:JSON.stringify({
          userId,
          videoId: Id,
          timeSpend: time,
        })
      })
      const resp = await data.json()
      console.log('Real-time spent sent to backend:', time,resp);
    } catch (error) {
      console.error('Error tracking time spent:', error);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (realTimeSpent > VideoDuration) {
       
      sendTimeSpent(VideoDuration);
    }
    else if (realTimeSpent >=requiredTimetowatch){
      sendTimeSpent(realTimeSpent)
    }
  };

  return (
    <div className="flex justify-center bg-gray-900 p-4 min-h-screen rounded-lg shadow-lg">
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/watch?v=${Id}`}
        playing={isPlaying}
        controls={true}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        width="90vw"
        height="80vh"
        className="rounded-lg overflow-hidden"
      />
    </div>
  );
};

export default VideoPlayer;