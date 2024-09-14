import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Import toast for notifications

const DeleteVideo = () => {
  const [videos, setVideos] = useState(null);

  // Fetch videos when component mounts
  useEffect(() => {
    async function getVideos() {
      try {
        const data = await fetch(`/v1/admin/getvideo`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resp = await data.json();
        console.log("Fetched video data:", resp);
        setVideos(resp.Getvideo); // Assuming 'Getvideo' contains the video array
      } catch (error) {
        console.log("Error fetching videos:", error);
        toast.error("Error fetching videos. Please try again.");
      }
    }
    getVideos();
  }, []);

  // Delete video by ID
  async function handleDelete(videoId) {
    try {
      console.log("Deleting video with ID:", videoId);

      const data = await fetch(`/v1/admin/deletevideo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: videoId }),
      });

      const resp = await data.json();
      console.log("Response after delete:", resp);

      // Check if deletion was successful
      if (resp.sucess) {
        toast.success("Video deleted successfully!");
        // Update UI after deletion
        setVideos(videos.filter((video) => video._id !== videoId));
      } else {
        toast.error("Failed to delete video. Please try again.");
      }
    } catch (error) {
      console.log("Error deleting video:", error);
      toast.error("Error deleting video. Please try again.");
    }
  }

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Delete Videos</h2>

      {/* Grid for Video Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos && videos.map((video) => (
          <div key={video._id} className="bg-gray-800 p-4 rounded-xl shadow-lg">
            {/* Video Title */}
            <h3 className="text-md font-semibold mb-2">{video.snippet.title}</h3>
             <h2>StartTime {`${new Date(video.startTime).toLocaleString()}`}</h2>
             <h2>EndTime {`${new Date(video.endTime).toLocaleString()}`}</h2>
            {/* Video Thumbnail */}
            <img
              src={video.snippet.thumbnails?.default?.url}
              alt="Video thumbnail"
              className="w-full h-auto mb-4 rounded-md"
            />

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(video._id)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* If no videos are available */}
      {!videos && <p className="text-center text-gray-400">No videos available to delete</p>}

      {/* Toaster component to show notifications */}
      <Toaster position="top-right" />
    </div>
  );
};

export default DeleteVideo;
