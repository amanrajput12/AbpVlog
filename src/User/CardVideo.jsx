import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetVideo } from './UseGetVideo.js';
import { useNavigate } from 'react-router-dom';
import { addvideoId } from './GetSlice.js';
import Cookies from "js-cookie"
const CardVideo = () => {
  const dispatch = useDispatch();
  const video = useSelector((store) => store.GetVideo);
  const userId = Cookies.get('myid');
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(GetVideo({userId,cardNo:video.cardNo}));
  }, [dispatch]);

  const handlePlay = (id) => {
    dispatch(addvideoId(id));
    navigate('/video/play');
  };

  return (
    <div className="min-h-screen  text-white px-6 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Videos</h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {video?.data?.data?.map((video) => (
          <div
            key={video._id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              onClick={() => handlePlay(video.videoId)}
              src={video.snippet.thumbnails.high.url}
              alt="Thumbnail"
              className="w-full h-48 object-cover cursor-pointer"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                {video.snippet.title}
              </h3>
              <p className="text-sm text-gray-400">
                {video.snippet.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardVideo;
