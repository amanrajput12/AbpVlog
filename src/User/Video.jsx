import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetVideo } from './UseGetVideo.js'
import { useNavigate } from 'react-router-dom'
import { addvideoId } from './GetSlice.js'

const Video = () => {
    const dispatch = useDispatch()
    const video = useSelector((store)=>store.GetVideo)
    const navigate = useNavigate()
    console.log(video);
    
     useEffect(()=>{
        dispatch(GetVideo())
     },[])

     const handlePlay =(id)=>{
      dispatch(addvideoId(id))
      navigate('/video/play')
     }
  return (
    <div className='text-white'>
    <h2>Video Getting comp</h2>   
    {video?.data?.data?.map((video)=><div key={video.videoId}><h2>{video.snippet.description}</h2>
    <img onClick={()=>handlePlay(video.videoId)} src={video.snippet.thumbnails.high.url} alt="image" />
    </div>)  }   
    </div>
  )
}

export default Video
