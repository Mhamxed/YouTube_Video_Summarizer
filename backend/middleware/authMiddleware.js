import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract the token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Please Login First" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach the decoded user to the request object
        next();
    } catch (error) {
        return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
};

export default authenticateJWT;

