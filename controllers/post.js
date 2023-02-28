import Post from "../models/Post.js";

export const getPost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
}
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}