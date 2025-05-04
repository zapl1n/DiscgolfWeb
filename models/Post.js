
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  images: [{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Image",
  }],
  email: {
    type: String,
    required: true,
    match: [
      /^[^\s@]+@[^\s@]+\.(ee|com|org|net)$/,
      'Lubatud on ainult .ee, .com, .org ja .net e-mailid',
    ],
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
