const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const {authMiddleware, adminMiddleware} = require("../middleware/authMiddleware");
const sendEmail = require("../mailer");

router.post("/posts/:id/accept", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);


    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    
    post.status = "accepted";
    await post.save();

    const email = post.email
    const subject = "Post Accepted";
    const text = 'Your post has been accepted. Thank you for your contribution!';

    await sendEmail(email, subject, text);

  

    res.status(200).json({ message: "Post accepted successfully" });
  } catch (error) {
    console.error("Error accepting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/posts/:id/reject", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.status = "rejected";
    post.rejectReason = req.body.rejectReason;
    await post.save();

    
    res.status(200).send("Postitus on tagasi lükatud");
  } catch (error) {
    console.error("Error rejecting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/posts/:id/delete", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await Post.findByIdAndDelete(postId)
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/posts", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json(allPosts);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    res.status(500).json({ message: "Error fetching all posts." });
  }
});

module.exports = router;
