const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { upload, resizeImage } = require("../middleware/upload");
const fs = require("fs");
const path = require("path");

router.post("/create", upload.single("imgFile"), async (req, res) => {
  try {
    const { name, location, email, phone, postType } = req.body;

    const courses = await require("../models/Courses").findOne({county});

    if (!courses) {
      return res.status(400).json({ message: `Maakonda ${county} ei leitud.` });
    }

    let imgPath = "";
    if(req.file) {
      const resizedImageBuffer = await resizeImage(req.file.buffer);
      imgPath = `uploads/${Date.now()}-${req.file.originalname}`;
      fs.writeFileSync(path.join(__dirname, "../", imgPath), resizedImageBuffer);
    }

    const newPost = new Post({
      name,
      location: courses._id,
      imgFileName: imgPath,
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

router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json(allPosts);    
  } catch (error) {
    console.error("Error fetching all posts:", error);
    res.status(500).json({ message: "Error fetching all posts." });
  }
})

router.get("/county/:countyName", async (req, res) => {
  try {
      const { countyName } = req.params;
      console.log(countyName);
      const courses = await require("../models/Courses").findOne({ county: countyName });
      if (!courses) {
          return res.status(404).json({ message: "County not found" });
      }
      res.status(200).json(courses);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


module.exports = router;
