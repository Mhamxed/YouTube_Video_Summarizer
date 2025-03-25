import { Router } from "express";
import videosById from "../controllers/videos.js";
const videos = Router()

videos.get('/api/videos/', videosById)

export default videos;