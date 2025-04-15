
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imgFileName: {
    type: String,
    required: false,
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
