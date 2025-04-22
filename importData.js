const mongoose = require('mongoose');
const dotenv = require('dotenv');
const courseModel = require('./models/Courses');
const courses = require('./discgolf_pargid.json')

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

    for(const course of courses ){
      await courseModel.create({
        county: course.county,
        course: course.course,
      }
      );
      console.log(`Course ${course.course} imported successfully`);
    }

    process.exit();

  
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
    
  }
};

importData();