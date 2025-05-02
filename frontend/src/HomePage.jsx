
import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const HomePage = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        name:'',
        location:'',
        course:'',
        imgFileName:'',
        email:'',
        phone:'',
        postType:'lost',
    });

    const [image, setImage] = useState(null);
    const [counties, setCounties] = useState([]);
    const [courses, setCourses] = useState([]);

    // Laeme maakonnad
    useEffect(() => {
        const fetchCounties = async () => {
            try {
                const res = await fetch('http://localhost:8000/counties')
                const data = await res.json();
                setCounties(data);
            } catch (error) {
                console.error('Error fetching counties:', error);
            }
        };
        fetchCounties();
    }, []);

    // Laeme kursused maakonna järgi
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch(`http://localhost:8000/course?county=${formData.county}`);
                const data = await res.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
       fetchCourses();
    }, [formData.county]);

    // Funktsioon vormi kuvamiseks 
    const handleShowForm = () => {
        setIsFormVisible(true);
    };

    // Funktsioon vormi sulgemiseks
    const handleHideForm = () => {
        setIsFormVisible(false);
        setFormData({
            name:'',
            location:'',
            imgFileName:'',
            email:'',
            phone:'',
            postType:'lost',
        });
        setImage(null);
    };

    // Vormi andmete muutmine
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Pildi üleslaadimise funktsioon
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            //
            setImage(file);
        }
    };

    const [confirmation, setConfirmation] = useState('');

    // Vormi saatmise funktsioon
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('name', formData.name);
        form.append('location', formData.county);
        form.append('course', formData.course);
        form.append('email', formData.email);
        form.append('phone', formData.phone);
        form.append('postType', formData.postType);
        if (image) {
            form.append('imgFile', image);
        }

        console.log('Form data:', form);


        try {
            const response = await fetch('http://localhost:8000/posts/create', {
                method: 'POST',
                body: form,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Post created:', data);
            setConfirmation('Postitus on edukalt loodud!');
            setTimeout(() => {
                setConfirmation('');
            }, 3000); 
            handleHideForm();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <>
       
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
            <Box>
                {!isFormVisible && (
                    <Button 
                    variant="contained"
                     color="primary"
                      onClick={handleShowForm}
                      startIcon={<AddCircleIcon />}
                      sx={{
                        fontSize: '1.5rem',
                        padding: '15px 30px',
                        borderRadius: '12px',
                        backgroundColor: '#535bf2',
                        '&:hover': {
                            backgroundColor: '#4242d4',
                        },
                      }}>
                        Lisa uus postitus
                    </Button>
                )}
                {isFormVisible && (
           
        <Card sx={{ width: '100%', maxWidth: 600, bgcolor: '#1e1e1e', color: '#aaa', p: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Lisa uus postitus
            </Typography>
      
            {confirmation && <Typography sx={{ color: 'green', mt: 2 }}>{confirmation}</Typography>}
      
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Ketta nimi"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{ color: '#aaa' }}
              />
      
              <FormControl fullWidth margin="normal" required>
                <InputLabel sx={{ color: '#aaa' }}>Maakond</InputLabel>
                <Select
                  name="county"
                  value={formData.county || ''}
                  onChange={handleInputChange}
                  label="Maakond"
                  sx={{ color: '#aaa' }}
                >
                  <MenuItem disabled value="">Vali maakond</MenuItem>
                  {counties.map((county) => (
                    <MenuItem key={county} value={county}>
                      {county}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
      
              <FormControl fullWidth margin="normal" required>
                <InputLabel sx={{ color: '#aaa' }}>Rada</InputLabel>
                <Select
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  label="Rada"
                  sx={{ color: '#aaa' }}
                >
                  <MenuItem value="">Vali rada</MenuItem>
                  {courses.map((course) => (
                    <MenuItem key={course} value={course}>
                      {course}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
      
              <FormControl fullWidth margin="normal">
  <InputLabel shrink sx={{ color: '#aaa' }}>
    Lae pilt
  </InputLabel>
  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    style={{
      color: '#aaa',
      backgroundColor: '#2c2c2c',
      padding: '10px',
      borderRadius: '4px',
    }}
  />
</FormControl>

      
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{ 
                    input: { color: '#aaa' },
                    label: { color: '#aaa' } 
                }}
              />
      
              <TextField
              
                fullWidth
                label="Telefon"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                margin="normal"
                sx={{ 
                    input: { color: '#aaa' },
                    label: { color: '#aaa' } 
                }}
              />
      
              <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: '#7351FA' }}>Postituse tüüp</InputLabel>
                <Select
                  name="postType"
                  value={formData.postType}
                  onChange={handleInputChange}
                  label="Postituse tüüp"
                  sx={{ color: '#aaa' }}
                >
                  <MenuItem value="lost">Kadunud</MenuItem>
                  <MenuItem value="found">Leitud</MenuItem>
                </Select>
              </FormControl>
      
              <Box mt={3} display="flex" justifyContent="space-between">
                <Button type="submit" variant="contained" color="primary">
                  Saada
                </Button>
                <Button onClick={handleHideForm} variant="outlined" color="secondary">
                  Sulge
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
        )}
      </Box>
      </Box>
      </>
    );
}

      

        

            export default HomePage;

           