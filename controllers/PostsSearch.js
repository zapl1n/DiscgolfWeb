const { query } = require("express");
const Post = require("../models/Post");
const post = require("../models/Post");

const searchPosts = async (req, res) => {
    try {
        const search = req.query.search;

        const posts = await post.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { locationText: { $regex: search, $options: "i" } },
                { courseText: { $regex: search, $options: "i" } },
            ],
        })

        console.log('Otsingud:', search);
        console.log('Leitud postitused:', posts);

       res.status(200).json(posts);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
        
    }
}

module.exports = {
    searchPosts,
}