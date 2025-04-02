const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/posts/:id/accept", authMiddleware, async (req, res) => {
  try {
    const postId = req.params.id;
    console.log("Postituse ID:", postId);
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.status = "accepted";
    await post.save();

  

    res.status(200).json({ message: "Post accepted successfully" });
  } catch (error) {
    console.error("Error accepting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/posts/:id/reject", authMiddleware, async (req, res) => {
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

router.delete("/posts/:id/delete", authMiddleware, async (req, res) => {
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

module.exports = router;
