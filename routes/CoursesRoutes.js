const express = require('express');
const router = express.Router();
const courses = require('../courses.json');

router.get('/courses/:city', (req, res) => {
  const { city } = req.params;
  
  const filteredCourses = courses.courses.filter(course => course.City === city);
  const uniqueCourses = [...new Map(filteredCourses.map(course => [course.Fullname, course])).values()];
  res.json(uniqueCourses);
}
);

module.exports = router;