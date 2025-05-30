const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Courses = require("../models/Courses");
const Image = require("../models/ImageSchema");
const { upload, resizeImage } = require("../middleware/upload");
const fs = require("fs");
const path = require("path");
const { searchPosts } = require("../controllers/PostsSearch");

router.post("/", upload.array("imgFile",3), async (req, res) => {
  
  try {

    const images = []
    console.log("Files received:", req.files);

    if (req.files && req.files.length > 0) {
      for(const file of req.files) {
        console.log("Processing file:", file);
        const resizedImageBuffer = await resizeImage(file.buffer);
        const imgPath = `uploads/${Date.now()}-${file.originalname}`;
        fs.writeFileSync(path.join(__dirname, "../", imgPath), resizedImageBuffer);

        const image = new Image({
          fileName: imgPath,
          isUploaded: true,
      })
      console.log("Image object:", image);

      const savedImage = await image.save();
      images.push(savedImage._id);
    }
  }

    const { name, location, course, email, phone, postType } = req.body;
    console.log("Adnmed:", req.body);

    const countyData = await Courses.findOne({ county: location, course: course });
    console.log('County data:', countyData);
    if (!countyData) {
      return res.status(404).json({ message: "County not found" });
    }
  
    if (countyData.course.toLowerCase() !== course.toLowerCase()) {
      return res.status(404).json({ message: "Course not found in the specified county" });
    }


    const newPost = new Post({
      name,
      location: countyData._id,
      locationText: countyData.county,
      course: countyData._id,
      courseText: countyData.course,
      images,
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
  res.send('Test endpoint working!');
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
    const allPosts = await Post.find({status:"accepted"}).populate('location').populate('course').populate('images');
    
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

router.get("/search", searchPosts)


module.exports = router;
