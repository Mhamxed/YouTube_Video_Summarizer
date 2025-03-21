import Axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../App.jsx";
import VideoPreview from "./preview.jsx";
import Summary from "./summary.jsx";
import KeyInsights from "./keyinsights.jsx";
import YouTubeInput from "./youtubeinput.jsx"; 
import YouTubeSummary from "./summary.jsx";
import Loading from "./loading.jsx";
import ResultsDisplay from "./result.jsx";
const API = import.meta.env.VITE_SERVER_URL;

function Analyze() {
    const { token, summary, setSummary, keyInsights, setKeyInsights } = useContext(UserContext)
    const [showResults, setshowResults] = useState(false)
    const [youtubeLink, setYoutubeLink] = useState("")
    const [preview, setPreview] = useState(false)
    const [thumbnailUrl, setThumbnailUrl] = useState("")
    const [title, setTitle] = useState("")
    const [duration, setDuration] = useState(0)
    const [viewCount, setViewCound] = useState(0)
    const [channelName, setChannelName] = useState("")
    const [timestamp, setTimestamp] = useState("")
    const [videoId, setVideoId] = useState(null)
    
    const handlePreview = async (e) => {
        e.preventDefault()
        try {
            const res = await Axios.post(`${API}/api/video/analyze`, { youtubeLink }, {
                headers: { Authorization: `Bearer ${token}` }, // Headers
                withCredentials: true, // Ensures cookies (if needed)
            })

            if (res.data.error) {
                alert(res.data.error)
            } else {
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
            const res = await Axios.post(`${API}/api/video/generate`, { videoId }, {
                headers: { Authorization: `Bearer ${token}` }, // Headers
                withCredentials: true, // Ensures cookies (if needed)
            })

            if (res.data.error) {
                alert(res.data.error)
            } else {
                setshowResults(true)
                setSummary(res.data.summary)
                setKeyInsights(res.data.keyInsights)
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="flex flex-col flex-grow gap-y-[1rem]">
            <ResultsDisplay summary={summary} keyInsights={keyInsights} YouTubeInput={<YouTubeInput 
            youtubeLink={youtubeLink} 
            setYoutubeLink={setYoutubeLink} 
            handlePreview={handlePreview} 
            preview={preview}
            VideoPreview={
                <VideoPreview 
                timestamp={timestamp} 
                thumbnailUrl={thumbnailUrl} 
                title={title} 
                duration={duration} 
                views={viewCount} 
                channelName={channelName}
                handleGenerate={handleGenerate}/>
            }
            />}
            showResults={showResults}/>
        </div>
    )
}

export default Analyze;