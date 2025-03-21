import { useContext, useEffect, useRef, useState } from "react";
import Axios from "axios";
import VideoPreview from "./preview";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
const API = import.meta.env.VITE_SERVER_URL;

const VideoHistory = () => {
    const [summary, setSummary] = useState([])
    const [keyInsights, setKeyInsights] = useState([])
    const [copied, setCopied] = useState(false);

    const [Video, setVideo] = useState(null)
    const { token } = useContext(UserContext)
    const { id } = useParams()
    // Reference to your results container
    const resultsRef = useRef(null);

    const getVideoInfos = async () => {
        try {
            const res = await Axios.get(`${API}/api/videos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }, // Headers
                withClimeentials: true, // Ensures cookies (if needed)
            })
            if (res.data.error) {
                alert(res.data.error)
            } else {
                setSummary(res.data.summary)
                setKeyInsights(res.data.keyInsights)
                setVideo(res.data.video)
            }
        } catch(e) {
            console.error(e)
        }
    }
    
    useEffect(() => {
        getVideoInfos()
    }, [id])

    // Function to handle copying results
    const handleCopyResults = () => {
    // Create a string from all completed insights and the current one
    const textToCopy = [
        "Summary",
        ...summary,
        "KeyInsights",
        ...keyInsights
    ].join('\n\n');

    // Copy to clipboard
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
        // Show success message
        setCopied(true);
        
        // Reset the "Copied" message after 2 seconds
        setTimeout(() => {
            setCopied(false);
        }, 2000);
        })
        .catch(err => {
        console.error('Failed to copy text: ', err);
        });
    };

  return (
    <div className="md:flex md:justify-center bg-gray-50 min-h-1/2 p-8">
      <div className={`flex flex-col md:flex-row gap-8 transition-all duration-1000 'transform'`}>
        {/* Preview Section */}
        {
            Video && <div className={`"transition-all duration-1000 ease-in-out"`}>
            <VideoPreview title={Video.title} 
            thumbnailUrl={Video.thumbnailUrl} 
            channelName={Video.channelName} 
            timestamp={Video.timestamp}
            duration={Video.duration}
            views={Video.viewCount}
            />
        </div>
        }
        
        {/* Results Section - appears with typewriter effect */}
        {(
          <div className="bg-white rounded-lg shadow-md p-6 md:w-2/3 flex flex-col" ref={resultsRef}>
            { (summary && keyInsights) && (
                <div className="self-end">
                <button 
                    onClick={handleCopyResults}
                    className="px-4 py-2 bg-lime-600 text-white rounded hover:bg-lime-700 transition flex items-center"
                    aria-label="Copy results to clipboard"
                >
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" 
                    />
                    </svg>
                    {copied ? 'Copied!' : 'Copy Results'}
                </button>
                </div>
            )}
            <h2 className="text-xl font-bold text-black mb-4">Summary</h2>
            <div className="font-mono whitespace-pre-line ml-4">
            {summary.map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
            ))}
            {/* <span className="inline-block w-2 h-5 bg-lime-600 ml-1 animate-pulse"></span> */}
            </div>
            {<h2 className="text-xl font-bold text-black mb-4">Key Insights</h2> }
            <div className="font-mono whitespace-pre-line ml-4">
            { <ol className="list-decimal pl-6">
                {keyInsights.map((keyinsight, index) => {
                    return <li key={index} className="mb-4">{keyinsight}</li>
                })}
            </ol>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoHistory;