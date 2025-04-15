import fs from 'fs'; // kui kasutad ESM mooduleid
import fetch from 'node-fetch'; // importige node-fetch

const url = "https://discgolfmetrix.com/api.php?content=courses_list&country_code=EE";

async function fetchAndSaveCourses() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Salvestame andmed faili
    fs.writeFileSync('courses.json', JSON.stringify(data, null, 2), 'utf-8');
    
    console.log('Data written to file successfully');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchAndSaveCourses();
