import React, { useEffect, useRef, useState } from 'react';
import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useDispatch } from 'react-redux';
import VideoAdd from './useVideoAdd.js';

const SearchVideo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState(Cookies.get('myid'));
  const [data, setData] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const cardNo = useRef(null)
  const Amount = useRef(null)

  
  const token = Cookies.get("accessToken");
  const dispatch = useDispatch();

  // Function to search YouTube videos based on query
  async function search() {
    try {
      const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchQuery}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const resp = await response.json();
      console.log("search data", resp);
      setData(resp.items);
    } catch (error) {
      console.log("error on search video", error);
      toast.error("Failed to search videos. Please try again.");
    }
  }

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Search and Upload Videos</h2>

      {/* Search input and button */}
      <div className="mb-4 text-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 text-black rounded-lg w-64"
          placeholder="Search for videos..."
        />
        <button onClick={search} className="bg-green-500 p-2 ml-4 rounded-md">
          Search
        </button>
      </div>

      {/* Display videos in a grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((video) => (
          <div key={video.id.videoId} className="bg-gray-800 p-4 rounded-xl shadow-lg">
            {/* Video Description */}
            <h3 className="text-sm font-semibold mb-2">{video.snippet.title}</h3>

            {/* Video Thumbnail */}
            <img
              src={video.snippet.thumbnails.high.url}
              alt="Video thumbnail"
              className="w-full h-auto mb-4 rounded-md"
            />

            {/* Start Time Picker */}
            <div className="mb-4">
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-400">From</label>
              <DateTimePicker
                id="startTime"
                onChange={(e) => setStartTime(e)}
                value={startTime}
                className="text-orange-500 w-full"
              />
            </div>

            {/* End Time Picker */}
            <div className="mb-4">
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-400">To</label>
              <DateTimePicker
                id="endTime"
                onChange={(e) => setEndTime(e)}
                value={endTime}
                className="text-orange-500 w-full"
              />
            </div>
            <div className=' flex flex-col  xl:flex-row text-black gap-1'>
              <input ref={cardNo} onChange={(e)=>{ cardNo.current =e.target.value
              console.log("card value",cardNo);
              
              }}  className='rounded-md p-1 ' type="text" placeholder='cardNo' />
              <input ref={Amount}  onChange={(e)=>{ Amount.current =e.target.value
              console.log("Amount",Amount);
              
              }} className='rounded-md p-1' type="text" placeholder='Amount' />
            </div>
            {/* Upload Button */}
            <button
              onClick={() => dispatch(VideoAdd({ startTime, endTime, id: video.id.videoId, snippet: video.snippet, toast, userId,cardNo:cardNo.current,Amount:Amount.current }))}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              Upload
            </button>
          </div>
        ))}
      </div>

      {/* Toaster for notifications */}
      <Toaster position="top-right" />
    </div>
  );
};

export default SearchVideo;
