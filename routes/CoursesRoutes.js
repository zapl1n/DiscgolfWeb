const express = require('express');
const router = express.Router();
const courses = require('../models/Courses')

router.get('/counties', async (req, res) => {
  
  try {
    const countiesData = await courses.distinct('county');
    console.log(countiesData);
    res.json(countiesData );
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving counties' });
  }
}
);

router.get('/course', async (req, res) => {

  const {county} = req.query;
  
  if (!county) {
    return res.status(400).json({ message: 'County is required' });
  }

  try {
    const courseData = await courses.find({county}).select('course')
    const courseNames = courseData.map(course => course.course);
    res.json(courseNames);
    console.log(courseData);
  } catch (error) {
    console.error('Error retrieving courses:', error);
    res.status(500).json({ message: 'Error retrieving courses' });
    
  }
}
);

module.exports = router;