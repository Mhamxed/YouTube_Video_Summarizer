import cancelGenerate from "../controllers/cancelgenerate.js";
import generateSummary from "../controllers/generatesummary.js";
import { Router } from "express";

const generate = Router()
generate.post('/api/video/generate', generateSummary)
generate.post('/api/video/generate/cancel', cancelGenerate)

export default generate;

