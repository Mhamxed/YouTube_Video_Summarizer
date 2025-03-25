import Axios from "axios";
import { useContext, useState } from "react";
import { NotificationContext, UserContext } from "../App.jsx";
import VideoPreview from "./preview.jsx";
import YouTubeInput from "./youtubeinput.jsx"; 
import ResultsDisplay from "./result.jsx";
const API = import.meta.env.VITE_SERVER_URL;

function Summarize() {
    const { token, summary, setSummary, keyInsights, setKeyInsights } = useContext(UserContext)
    const [showResults, setshowResults] = useState(false)
    const [showKeyinsights, setShowKeyinsights] = useState(false);
    const [youtubeLink, setYoutubeLink] = useState("")
    const [preview, setPreview] = useState(false)
    const [thumbnailUrl, setThumbnailUrl] = useState("")
    const [title, setTitle] = useState("")
    const [duration, setDuration] = useState(0)
    const [viewCount, setViewCound] = useState(0)
    const [channelName, setChannelName] = useState("")
    const [timestamp, setTimestamp] = useState("")
    const [videoId, setVideoId] = useState(null)

    const [isPreviewLoading, setIsPreviewLoading] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [isWritting, setIsWritting] = useState(false)

    const { setNotification, closeNotification } = useContext(NotificationContext)
    
    const handlePreview = async (e) => {
        e.preventDefault()
        try {
            setIsPreviewLoading(true)
            const res = await Axios.post(`${API}/api/video/summarize`, 
                { youtubeLink }, {
                headers: { Authorization: `Bearer ${token}` }, // Headers
                withCredentials: true, // Ensures cookies (if needed)
                validateStatus: function(status) {
                    return true;
                }
            })

            if (res.data.error) {
                setIsPreviewLoading(false)
                setNotification({ 
                    message: res.data.error,
                    type: "error",
                    onClose: closeNotification
                })
            } else {
                setIsPreviewLoading(false)
                setThumbnailUrl(res.data.thumbnailUrl)
                setTitle(res.data.title)
                setDuration(res.data.duration)
                setViewCound(res.data.viewCount)
                setTimestamp(res.data.timestamp)
                setChannelName(res.data.channelName)
                setPreview(true)
                setVideoId(res.data.videoId)
            }
        } catch(e) {
            console.error(e)
        }
    }

    const handleGenerate = async () => {
        try {
            setIsGenerating(true)
            const res = await Axios.post(`${API}/api/video/generate`, 
                { videoId }, {
                headers: { Authorization: `Bearer ${token}` }, // Headers
                withCredentials: true, // Ensures cookies (if needed)
                validateStatus: function(status) {
                    return true;
                }
            })

            if (res.data.error) {
                setIsGenerating(false)
                setNotification({ 
                    message: res.data.error,
                    type: "error",
                    onClose: closeNotification
                })
            } else {
                setIsGenerating(false)
                setshowResults(true)
                setSummary(res.data.summary)
                setKeyInsights(res.data.keyInsights)
                setIsWritting(true)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleCancel = async () => {
        try {
            const res = await Axios.post(`${API}/api/video/generate/cancel`, 
                { videoId }, {
                headers: { Authorization: `Bearer ${token}` }, // Headers
                withCredentials: true, // Ensures cookies (if needed)
            },
            {
                validateStatus: function(status) {
                    return true;
                }
            })

            if (res.data.error) {
                setNotification({ 
                    message: res.data.error,
                    type: "error",
                    onClose: closeNotification
                })
            } else {
                setNotification({ 
                    message: res.data.message,
                    type: "normal",
                    onClose: closeNotification
                })
                setPreview(false)
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="flex flex-col flex-grow gap-y-[1rem]">
            <ResultsDisplay 
                summary={summary} 
                keyInsights={keyInsights} 
                YouTubeInput={
                <YouTubeInput 
                    youtubeLink={youtubeLink} 
                    setYoutubeLink={setYoutubeLink} 
                    handlePreview={handlePreview} 
                    preview={preview}
                    isPreviewLoading={isPreviewLoading}
                    VideoPreview={
                        <VideoPreview 
                        timestamp={timestamp} 
                        thumbnailUrl={thumbnailUrl} 
                        title={title} 
                        duration={duration} 
                        views={viewCount} 
                        channelName={channelName}
                        handleGenerate={handleGenerate}
                        handlecancel={handleCancel}
                        isGenerating={isGenerating}
                        isWritting={isWritting}/>
                    }
            />}
                showResults={showResults}
                setshowResults={setshowResults}
                showKeyinsights={showKeyinsights}
                setShowKeyinsights={setShowKeyinsights}/>
        </div>
    )
}

export default Summarize;