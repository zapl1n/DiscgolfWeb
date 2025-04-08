// This is a Mongoose model for a post in a lost and found application.
// It defines the schema for a post, including fields for the name, location,
// image file name, email, phone number, status, rejection reason, post type, and creation date.
// It also sets default values for the status and creation date fields.
// The schema is then used to create a Mongoose model called "Post", which is exported for use in other parts of the application.
// models/Post.js
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imgFileName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  rejectReason: {
    type: String,
  },
  postType: {
    type: String,
    enum: ["lost", "found"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

PostSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    this.updatedAt = Date.now();
  }
  next();
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
