const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const {authMiddleware, adminMiddleware} = require("../middleware/authMiddleware");

const notifyClient = require("../services/emailHelper");




router.get("/posts", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const allPosts = await Post.find()
    .populate('images')
    .populate('course')
    .populate('location')
    
    console.log("All posts:", allPosts); // Logige kõik postitused
    
    res.status(200).json(allPosts);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    res.status(500).json({ message: "Error fetching all posts." });
  }
});

router.get("/posts/:id", authMiddleware, adminMiddleware, async (req,res) =>{
  try{
    const postId = req.params.id;
    console.log("Saadud postID:",postId)
    const post = await Post.findById(postId);
 console.log(post)
    res.status(200).json(post)
  } catch (error){
    console.log("Post not found")
  }
})

router.put("/posts/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const updateFields = {};

    if (req.body.status === 'accept') {
      updateFields.status = "accepted";
    } else if (req.body.status === 'reject') {
      updateFields.status = "rejected";
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: false } // <-- oluline: ei valideeri kogu dokumenti
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    await notifyClient(updatedPost);

    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/posts/:id/reject", authMiddleware, adminMiddleware, async (req, res) => {
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




module.exports = router;
