import db from "../prisma/queries.js"
import dotenv from "dotenv"
dotenv.config()

async function cancelGenerate(req, res) {
    try{
        const userId = req.user.id
        const videoId = req.body.videoId
        const id = await db.IdByVideoIdAndUserId(videoId, userId)
        await db.deleteVideo(id)
        res.status(200).json({
            message: "Canceled successfully"
        })
    }
    catch(e) {
        console.error(e)
        res.status(500).json({
            error: 'Failed to to cancel'
        })
    }
}

export default cancelGenerate;