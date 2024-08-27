import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';

const VideoPlayer = () => {
     const time = new Date().toLocaleTimeString()
  const playerRef = useRef(null);
  const [startTime, setStartTime] = useState(null);
  const [EndTime, setEndTime] = useState(null);
    const Id = useSelector((store)=>store.GetVideo.videoId) 



    

  useEffect(() => {
    setStartTime(time)
    console.log("start time",time);
    
    let timer 
  //   timer = setInterval(() => {
  //     const currentPlayTimestamp =  Math.floor(playerRef.current.getCurrentTime());
  //     const VideoTime = playerRef.current.getDuration();
  //     const BufferEnd =Math.floor(playerRef.current.getSecondsLoaded());

  //  console.log("play",currentPlayTimestamp,"   ",BufferEnd, " videotime",VideoTime);
   
    
  //   //   handlePlay();
  //   //   handleBufferEnd();

  //     // Compare the play and bufferEnd timestamps
  //     if (currentPlayTimestamp < BufferEnd) {
  //       console.log('Play is fine');
  //     } else if (currentPlayTimestamp >= VideoTime) {
  //       // clearInterval(timer)
  //       console.log('video End');
  //     }

  //   }, 1500);

    return () => {
        setEndTime(time)
        console.log("video end at",EndTime);
        
      clearInterval(check);
    };
  }, []);
 
  const handlePlay = () => {
    const timestamp = playerRef.current.getCurrentTime();

    
   
    console.log(`Play event at ${timestamp.toFixed(2)}s`);
  };

  const handlePause = () => {
    const timestamp = playerRef.current.getCurrentTime();

    console.log(`Pause event at ${timestamp.toFixed(2)}s`);
  };

  const handleBuffer = () => {
    const timestamp = playerRef.current.getCurrentTime();
  
    console.log(`Buffer event at ${timestamp.toFixed(2)}s`);
  };

  const handleBufferEnd = () => {
    const timestamp =playerRef.current.getSecondsLoaded();
       console.log("loading time",timestamp);
       
    console.log(`BufferEnd event at ${timestamp}s`);
  };

  const handleReady = () => {
    const timestamp = playerRef.current.getCurrentTime();
  
    console.log(`Video ready at ${timestamp.toFixed(2)}s`);
  };
 

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/watch?v=${Id}`}
        playing={true}
        controls={true}
      
        onReady={handleReady}   
        onPlay={handlePlay}
        onPause={handlePause}
        onBuffer={handleBuffer}
        onBufferEnd={handleBufferEnd}
        width="100%"
        height="50vh"
      />
      <div>
       
      </div>
    </div>
  );
};

export default VideoPlayer;
