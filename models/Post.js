import mongoose from "mongoose";

const PostSchema  = new mongoose.Schema(
    {
        title : String,
        img : String,
        desc : String,
        longDesc : String,
    }
)
const Post = mongoose.model("Post" , PostSchema );
export default Post;