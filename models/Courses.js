const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  county: {
    type: String,
    required: true,
  },
  courses: {
    type: [String],
    required: true,
  },
});

const Courses = mongoose.model("Course", CourseSchema);
module.exports = Courses;
