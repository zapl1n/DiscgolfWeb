const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  county: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
});

const Courses = mongoose.model("Course", CourseSchema);
module.exports = Courses;
