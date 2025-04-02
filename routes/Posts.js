const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.post("/create", async (req, res) => {
  try {
    const { name, location, imgFileName, email, phone, postType } = req.body;

    const newPost = new Post({
      name,
      location,
      imgFileName,
      email,
      phone,
      postType,
    });

    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Postituse lisamine ebaõnnestus:", error);
    res.status(500).json({ message: "Postituse lisamine ebaõnnestus." });
  }
});

router.get("/lost", async (req, res) => {
  try {
    const lostPosts = await Post.find({ postType: "lost" });
    res.status(200).json(lostPosts);
  } catch (error) {
    console.error("Error fetching lost posts:", error);
    res.status(500).json({ message: "Error fetching lost posts." });
  }
});
router.get("/found", async (req, res) => {
  try {
    const foundPosts = await Post.find({ postType: "found" });
    res.status(200).json(foundPosts);
  } catch (error) {
    console.error("Error fetching found posts:", error);
    res.status(500).json({ message: "Error fetching found posts." });
  }
});

module.exports = router;
