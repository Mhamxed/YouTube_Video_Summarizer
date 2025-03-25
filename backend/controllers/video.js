import db from "../prisma/queries.js"
import dotenv from "dotenv"
dotenv.config()

export async function videoById(req, res) {
    try {
        const { id } = req.params
        const videoInfos = await db.videoById(id)
        if (videoInfos) {
            const video = {
                title: videoInfos.title,
                thumbnailUrl: videoInfos.thumbnailUrl,
                channelName: videoInfos.channelName,
                timestamp: videoInfos.timestamp,
                duration: videoInfos.duration,
                viewCount: videoInfos.viewCount
            }
            res.status(200).json({
                summary: videoInfos.summary,
                keyInsights: videoInfos.keyInsights,
                video: video
            })
        } else {
            res.status(404).json({
                error: "Not found"
            })
        }
    } catch(e) {
        console.error(e)
        res.status(500).json({
            error: "Could not get the video"
        })
    }
}

export async function deleteVideo(req, res) {
    try {
        const { id } = req.params
        await db.deleteVideoById(id)
        res.json({
            message: "Video Deleted successfully"
        })
    } catch(e) {
        console.error(e)
        res.status(500).json({
            error: "Could not delete video"
        })
    }
}