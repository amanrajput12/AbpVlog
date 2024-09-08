import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from "react-datetime-picker";


import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import VideoAdd from './useVideoAdd.js';
import Cookies from "js-cookie"
import toast, { Toaster } from 'react-hot-toast';
const AdminDashboard = () => {
  const token = Cookies.get("accessToken");
  const [userId, setUserId] = useState(Cookies.get('myid'));
  const [data, setData] = useState(null);
  const [startTime, SetStartTime] = useState(null);
  const [endTime, SetEndTime] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchVideo();
  }, [token]);

  async function fetchVideo() {
    try {
      const data = await fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCjICW5kTfJa0Kqgt5WOP2cA&maxResults=50&type=video", {
        method:"GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const resp = await data.json();
      setData(resp.items);
    } catch (error) {
      console.log("error on fetching videos", error.message);
    }
  }

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((data) => (
          <div className="bg-gray-800 p-4 rounded-xl shadow" key={data.id.videoId}>
            <h2 className="text-sm font-semibold mb-2">{data.snippet.description}</h2>
            <img src={data.snippet.thumbnails.high.url} alt="Video thumbnail" className="w-full h-auto mb-4" />
            <div className="mb-4">
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-400">From</label>
              <DateTimePicker
                id="startTime"
                onChange={(e) => SetStartTime(e)}
                value={startTime}
                 className="text-orange-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-400">To</label>
              <DateTimePicker
                id="endTime"
                onChange={(e) => SetEndTime(e)}
                value={endTime}
               className="text-orange-500"
              />
            </div>
            <button
              onClick={() => dispatch(VideoAdd({ startTime, endTime, id: data.id.videoId, snippet: data.snippet ,toast,userId}))}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Upload
            </button>
          </div>
        ))}
      </div>
      <Toaster/>
    </div>
  );
};

export default AdminDashboard;
