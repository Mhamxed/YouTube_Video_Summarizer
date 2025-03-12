import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import auth from "./routes/auth.js"
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

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`)
})