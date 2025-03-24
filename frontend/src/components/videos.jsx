import { useContext, useEffect, useState } from "react";
import VideoCard from "./video";
import Axios from "axios";
import { NotificationContext, UserContext } from "../App";
const API = import.meta.env.VITE_SERVER_URL;


// Grid component to display multiple video cards
const VideoCardGrid = () => {
    const [videos, setVideos] = useState([])
    const { token, refreshVideos } = useContext(UserContext)
    const { setNotification, closeNotification } = useContext(NotificationContext)


    const getVideos = async () => {
        try {
            const res = await Axios.get(`${API}/api/videos`, {
                headers: { Authorization: `Bearer ${token}` }, // Headers
                withClimeentials: true, // Ensures cookies (if needed)
                validateStatus: function(status) {
                    return true
                }
            })
            if (res.data.error) {
                setNotification({
                    message: res.data.error,
                    type: "error",
                    onClose: closeNotification
                })
            } else {
                setVideos(res.data.videos)
            }
        } catch(e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getVideos()
    }, [refreshVideos])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Previously Summarized Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoCardGrid;