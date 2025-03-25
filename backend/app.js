import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import auth from "./routes/auth.js"
import summarizeRoute from "./routes/summarize.js"
import authenticateJWT from "./middleware/authMiddleware.js";
import generate from "./routes/generatesummary.js";
import video from "./routes/video.js";
import videos from "./routes/videos.js";
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin: "http://localhost:5173", // React frontend URL
    credentials: true,
  })
);
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use("/", auth)
app.use("/", authenticateJWT, summarizeRoute)
app.use("/", authenticateJWT, generate)
app.use("/", authenticateJWT, video)
app.use("/", authenticateJWT, videos)

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`)
})