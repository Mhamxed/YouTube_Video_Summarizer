import db from "../prisma/queries.js"
import dotenv from "dotenv"
dotenv.config()

async function videosById(req, res) {
    try {
        const id = req.user.id
        const videos = await db.videos(id)
        if (videos) {
            res.status(200).json({
                videos
            })
        } else {
            res.status(404).json({
                error: "Not found"
            })
        }
    }
    catch(e) {
        console.error(e)
        res.status(500).json({
            error: e
        })
    }
}

export default videosById;