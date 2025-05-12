const express = require("express"); // Importime expressi
const router = express.Router(); // Loome routeri
const Post = require("../models/Post"); // Importime Post mudeli
const {authMiddleware, adminMiddleware} = require("../middleware/authMiddleware"); // Importime authMiddleware ja adminMiddleware
const notifyClient = require("../services/emailHelper"); // Importime notifyClient funktsiooni

// Kuvame adminile kõik postitused
router.get("/posts", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // Otsime kõik postitused andmebaasist
    const allPosts = await Post.find()
    // Kasutame populate meetodit, et täita seotud andmed
    .populate('images')
    .populate('course')
    .populate('location')
    console.log("All posts:", allPosts)
    
    res.status(200).json(allPosts);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    res.status(500).json({ message: "Error fetching all posts." });
  }
});
// Kuvame adminile postituse ID järgi
/*router.get("/posts/:id", authMiddleware, adminMiddleware, async (req,res) =>{
  try{
    const postId = req.params.id;
    console.log("Saadud postID:",postId)
    const post = await Post.findById(postId);
 console.log(post)
    res.status(200).json(post)
  } catch (error){
    console.log("Post not found")
  }
})*/

router.get("/posts/accepted", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log("Fetching accepted posts...");
    const response = await Post.find({ status: "accepted" })
    console.log("Accepted posts:", response)
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching accepted posts:", error);
    res.status(500).json({ message: "Error fetching accepted posts." });
  }
});
// Kasutame authMiddleware ja adminMiddleware, et veenduda, et ainult administraatorid saavad postitusi redigeerida
router.put("/posts/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // Loome objekti, kuhu salvestame staatuse uuendamise
    const updateFields = {};
    // Kui postituse staatust muudetakse, siis uuendame staatust
    if (req.body.status === 'accept') {
      updateFields.status = "accepted";
    } else if (req.body.status === 'reject') {
      const rejectReason = req.body.reason || '';
      if(!rejectReason){
        return res.status(400).json({ message: "Reason is required for rejection" });
      }
      updateFields.status = "rejected";
      updateFields.rejectReason = rejectReason;
      
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }
  
    // Otsime postituse ID järgi ja uuendame selle staatust
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: false } // Oluline, uuendame ainult staatust
    ).populate('images')
    .populate('course')
    .populate('location');
    
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    // Kui postitus on edukalt uuendatud, saadame kliendile e-kirja
    await notifyClient(updatedPost,req.body.reason);

    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: "Server error" });
  }
});

// Kasutame authMiddleware ja adminMiddleware, et veenduda, et ainult administraatorid saavad postitusi kustutada
router.delete("/posts/:id", authMiddleware, adminMiddleware, async (req, res) => {
  // Kustutame postituse ID järgi
  try {
    // Otsime postituse ID järgi
    const postId = req.params.id;
    const post = await Post.findById(postId);
    // Kui postitust ei leita, tagastame 404 vea
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    // Kasutame findByIdAndDelete meetodit, et leida ja kustutada postitus
    await Post.findByIdAndDelete(postId)
    // Kui postitus on edukalt kustutatud, tagastame 200 staatuse ja sõnumi
    res.status(200).json({ message: "Post deleted successfully" });

  } catch (error) {
    // Kui tekib viga, logime vea konsooli
    console.error("Error deleting post:", error);
    // Tagastame 500 vea, kui tekib viga
    res.status(500).json({ message: "Internal server error" });
  }
});
// Expordime routeri, et saaksime seda kasutada teistes failides
module.exports = router;
