import express  from "express";
import {verifyToken} from "../middleware/jwt.js"
import {getPost, getPosts} from '../controllers/post.js'

const router = express.Router();
router.get('/post/:id' ,verifyToken, getPost);
router.get('/home' , verifyToken, getPosts);

export default router;