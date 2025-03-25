import db from "../prisma/queries.js"
import dotenv from "dotenv"
import { Mistral } from "@mistralai/mistralai";
import convertIntoJsonString from "../helpers/convertintoobject.js";
dotenv.config()


const mistral = new Mistral({
    apiKey: process.env.MISTRAL_API_KEY,
  });

async function generateSummary(req, res) {
    try {
        const videoId = req.body.videoId
        const userId = req.user.id
        const transcript = await db.transcriptByVideoId(videoId, userId)
        const isResultExists = await db.isResultExists(videoId, userId)
        if (isResultExists) {
            return res.status(400).json({
                error: "Video already summarized"
            })
        }
        if (transcript) {
            // genrate summary and key insights with the help of LLM's
            const prompt = ` You are an expert video content analyzer. 
            Summarize the following YouTube video transcript:
            ${transcript}
            Provide:
            1. A concise summary (3 to 5 paragraphs) of the main content
            2. 3 to 5 key insights or takeaways from the video
            3. Format your response as JSON with keys "summary" and "keyInsights"`;

            const result = await mistral.chat.complete({
                model: "mistral-small-latest",
                stream: false,
                messages: [
                  {
                    content: prompt,
                    role: "user",
                  },
                ],
            });
            
            // handle case where the LLM returns an error
            if (!result) {
                res.status(417).json({
                    error: "Failed to genrate summary"
                })
            } else {
                const answer = convertIntoJsonString(result.choices[0].message.content)
                const summary = answer.summary
                const keyInsights = answer.keyInsights
                const id = await db.IdByVideoIdAndUserId(videoId, userId)
                await db.updateVideoInfo(id, videoId, userId, summary, keyInsights)
                res.status(200).json({
                    summary: summary,
                    keyInsights: keyInsights
                })
            }

        } else {
            res.json({
                error: "Could not find a specific video linked to the given user"
            })
        }
    } catch(e) {
        res.status(500).json({
            error: 'Failed to to generate summary'
        })
    }
}

export default generateSummary;