import { getSubtitles } from 'youtube-captions-scraper';
import { google } from 'googleapis'
import db from "../prisma/queries.js"
import dotenv from 'dotenv'
import convertIsoDuration from '../helpers/convertIsoDuration.js';
import timeAgo from '../helpers/timeago.js';
import formatViews from '../helpers/convertviewcount.js';
dotenv.config()

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

async function summarizeController(req, res) {
    try {
        const youtubeLink = req.body.youtubeLink
        const videoId = new URLSearchParams(youtubeLink)
            .get("https://www.youtube.com/watch?v")

        const isVideoExist = await db.isVideoAlreadyExists(videoId, req.user.id)
        if (!isVideoExist) {
            // Replace with your API key
            const youtube = google.youtube({
                version: 'v3',
                auth: YOUTUBE_API_KEY
            });

            // Get video details
            const videoResponse = await youtube.videos.list({
                part: 'snippet,contentDetails,statistics',
                id: videoId
            });
            
            // Check if video exists
            if (!videoResponse.data.items || videoResponse.data.items.length === 0) {
                return res.status(404).json({ error: 'Video not found' });
            }

            // get the captions of the video
            const captions = await getSubtitles({
                videoID: videoId
            });
            // generate the transcript by concatenating the captions together
            let transcript = ``
            captions.forEach(txtObj => {
                transcript += ` ${txtObj.text}`
            })

            const videoData = videoResponse.data.items[0];
            const snippet = videoData.snippet;
            const statistics = videoData.statistics
            const VideoURL = `https://www.youtube.com/watch?v=${videoId}`
            const title = snippet.title
            const channelName = snippet.channelTitle
            const channelId = snippet.channelId
            const duration = convertIsoDuration(videoData.contentDetails.duration)
            const timestamp = timeAgo(snippet.publishedAt)
            const viewCount = formatViews(statistics.viewCount)
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
            const userId = req.user.id
            await db.createVideo(
                VideoURL, 
                title, 
                channelName, 
                channelId, 
                videoId, 
                duration,
                timestamp,
                viewCount,
                thumbnailUrl, 
                transcript, 
                userId)
            res.status(201).json({
                thumbnailUrl,
                title,
                channelName,
                viewCount,
                duration,
                timestamp,
                videoId: videoId,
                message: "Video created successfully"
            })
        } else {
            // video does exit
            const videoInfos = db.videoByVideoId(videoId)
            res.json({
                error: "Video already exits",
                videoInfos: videoInfos
            })
        }
    } catch(e) {
        res.json({
            error: 'Failed to fetch video'
        })
    }
}

export default summarizeController;