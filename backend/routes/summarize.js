import { Router } from "express";
import summarize from "../controllers/summarize.js";
const summarizeRoute = Router()

summarizeRoute.post("/api/video/summarize", summarize)

export default summarizeRoute;