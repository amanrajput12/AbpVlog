import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import DateTimePicker from "react-datetime-picker"
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import VideoAdd from './useVideoAdd.js';

const AdminDashboard = () => {
      const token = useSelector((store)=>store?.user?.data?.data?.acessToken)
      console.log('on admin dashboard',token);
      const [data,setData] = useState(null)
      const [startTime,SetStartTime] = useState(null)
      const [endTime,SetEndTime] = useState(null)
     
       const dispatch = useDispatch()
    useEffect(()=>{
        fetchVideo()
    },[])
    async function fetchVideo() {
        try {
            const data  = await fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCjICW5kTfJa0Kqgt5WOP2cA&maxResults=50&type=video",{
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                  },
            })
     const resp = await data.json()
     console.log("video resp",resp);
     
setData(resp.items)
        } catch (error) {
            console.log("error on fetching videos",error.message);
            
        }
    }
      console.log(data);
      
      

  return (
    <div>
      <h2>Admin Dashboard</h2>
     
      {data?.map((data)=>
      <div key={data.id.videoId}>
         <h2>{data.snippet.description}</h2>
         <img src={data.snippet.thumbnails.default.url} alt="image" />
       
         
         <div>
        <label htmlFor="Time"> From </label>
        <DateTimePicker   onChange={(e)=>SetStartTime(e)} value={startTime} />
        </div>
        <div>
          {/* end time */}
        <label htmlFor="Time"> To </label>
        <DateTimePicker   onChange={(e)=>SetEndTime(e)} value={endTime} />
        </div>
        <button onClick={()=>dispatch(VideoAdd({startTime,endTime,id:data.id.videoId,snippet:data.snippet}))}>Upload</button>
      </div>)}
    

     
      
    </div>
  )
}

export default AdminDashboard
