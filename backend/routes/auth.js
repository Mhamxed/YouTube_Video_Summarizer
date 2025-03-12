import { Router} from "express";
import passport from "passport"
import { Strategy } from "passport-local";
import db from '../prisma/queries.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
const auth = Router()
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY

passport.use(
    new Strategy(async (username, password, done) => {
        try {
        const user = await db.userByUsername(username)

        if (!user) {
            return done(null, false, { usernameErr: "Invalid username" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
        // passwords do not match!
            return done(null, false, { passwordErr: "Invalid password" })
        }
            return done(null, user);
        } catch(err) {
            return done(err);
        }
    })
);

auth.post("/signup", 
    async (req, res, next) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const firstname = req.body.firstname
            const lastname = req.body.lastname
            const username = req.body.username
            await db.createUser(firstname, lastname, username, hashedPassword)
            res.json({
                message: "You have been signed up successfully"
            })
        } catch (error) {
            console.error(error);
            next(error);
        }
});

auth.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({
            usernameErr: info.usernameErr,
            passwordErr: info.passwordErr
        });
    
        // Generate a JWT (expires in 1 hour)
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
          expiresIn: "24h",
        });
    
        res.json({ token, user, message: "Logged in successfully" }); // Send token to frontend
      })(req, res, next);
});

auth.post("/logout", (req, res) => {
    res.clearCookie("token"); // Clear the cookie
    res.json({ message: "Logged out successfully" });
});

export default auth;