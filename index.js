import cookieSession from "cookie-session";
import express from "express"
import cors from "cors"
import "./passport.js";
import passport from "passport";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import apiRoutes from "./routes/api.js"
import morgan from 'morgan'

import authRoute from "./routes/auth.js"
import postRoute from './routes/post.js'
import { posts } from "./data.js";
import Post from "./models/Post.js";

//CONFIGURATION
const app = express();
dotenv.config();
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan("dev"))
app.use(cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
)
//ROUTES
app.use('/api', apiRoutes);
app.use("/auth", authRoute);
app.use("/posts", postRoute);

//DB CONFIG
mongoose.set('strictQuery', true);
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    //Post.insertMany(posts);
})
.catch((error) => console.log(`${error} did not connect`));