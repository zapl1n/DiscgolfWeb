const mongoose = require('mongoose');
const dotenv = require('dotenv');
const courseModel = require('./models/Courses');
const courses = require('./courses.json')

dotenv.config();


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  
})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Define the function to import data
const importData = async () => {
  try {

    const courseData = courses.map((course) => ({
        county: course.county,
        courses: course.courses
    }));
    console.log(courseData);

    await courseModel.insertMany(courseData);
    console.log('Data imported successfully');
   
    
  } catch (error) {
    console.error('Error importing data:', error);
    
  }
};

importData();