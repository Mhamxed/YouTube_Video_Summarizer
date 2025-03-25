import { Router } from "express";
import { videoById, deleteVideo } from "../controllers/video.js";
const video = Router()

video.get('/api/videos/:id', videoById)
video.delete('/api/videos/:id/delete', deleteVideo)

export default video;