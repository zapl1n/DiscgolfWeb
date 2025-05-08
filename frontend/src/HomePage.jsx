import { useEffect, useRef, useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, FormControlLabel, Checkbox } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const HomePage = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        course: '',
        imgFileName: '',
        email: '',
        phone: '',
        postType: 'lost',
    });

    const [image, setImage] = useState(null);
    const [counties, setCounties] = useState([]);
    const [courses, setCourses] = useState([]);
    const [OpenSnackbar, setOpenSnackbar] = useState(false);

    // Formi ref määramine
    const formRef = useRef(null);

    // Laeme maakonnad
    useEffect(() => {
        const fetchCounties = async () => {
            try {
                const res = await fetch('http://localhost:8000/counties');
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
            name: '',
            location: '',
            imgFileName: '',
            email: '',
            phone: '',
            postType: 'lost',
        });
        setImage(null);
    };

    // Vormi andmete muutmine
    const handleInputChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Pildi üleslaadimise funktsioon
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
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
        console.log("Form data before sending:");
        for (const [key, value] of form.entries()) {
            console.log(`${key}: ${value}`);
        }

        if(!formData.name || !formData.county || !formData.course || !formData.email || !formData.phone) {
          console.log("Please fill all the required fields");
          return;
        }
        console.log("Sending data to: http://localhost:8000/posts/create");

        try {
            const response = await fetch('http://localhost:8000/posts/create',  {
              method: 'POST',
              body: form,
            });
            console.log("Post response:", response);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Post created:', data);
            setOpenSnackbar(true);
            setTimeout(() => {
                setOpenSnackbar(false);
                handleHideForm();
            }, 2000);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    // Kui vorm muutub nähtavaks, kerime selle juurde
    useEffect(() => {
        if (isFormVisible && formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [isFormVisible]);

    return (
        <>
            <Box sx={{
                textAlign: 'center',
                py: 8,
                color: 'white',
            }}>
                <Typography variant="h1" sx={{
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #592cc4,rgb(132, 90, 249))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginTop: '10rem',
                    mb: 2,
                }}>
                    Kadunud või leitud discgolfi ketas?
                </Typography>
                <Typography variant="h5" sx={{ maxWidth: '600px', margin: '0 auto' }}>
                    Lisa teade kadunud või leitud kettast ning aita kogukonnal kettad üles leida!
                </Typography>

                <Box display="flex" justifyContent="center" alignItems="center" sx={{ pt: 4, backgroundColor: 'transparent' }}>
                    <Box>
                        {!isFormVisible && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleShowForm}
                                startIcon={<AddCircleIcon />}
                                sx={{
                                    fontSize: '1.2rem',
                                    padding: '15px 30px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(to right, #6a71f2,rgb(107, 63, 228))',
                                    color: '#fff',
                                    textTransform: 'none',
                                    '&:hover': {
                                        background: 'linear-gradient(to right,rgb(104, 42, 197),rgb(104, 42, 197))',
                                    },
                                }}>
                                Lisa uus postitus
                            </Button>
                        )}
                        {isFormVisible && (
                            <Card ref={formRef} sx={{ width: '100%', maxWidth: 500, bgcolor: '#1e1e1e', color: '#6a71f2', p: 3, borderRadius: '12px' }}>
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
                                            sx={{
                                                '& .MuiInputLabel-root': {
                                                    color: '#aaa',
                                                },
                                                '& .MuiInputBase-input': {
                                                    color: '#aaa',
                                                    fontSize: '1.1rem',
                                                },
                                            }}
                                            required
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
                                            <Box>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    id="upload-file"
                                                    style={{ display: 'none' }}
                                                />
                                                <label htmlFor="upload-file">
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        component="span"
                                                        startIcon={<CloudUploadIcon />}
                                                        sx={{
                                                            backgroundColor: '#535bf2',
                                                            '&:hover': {
                                                                backgroundColor: '#6a71f2',
                                                            },
                                                        }}
                                                    >
                                                        Lae pilt
                                                    </Button>
                                                </label>
                                            </Box>
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
                                            sx={{ input: { color: '#aaa' }, label: { color: '#aaa' } }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Telefon"
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            margin="normal"
                                            required
                                            sx={{ input: { color: '#aaa' }, label: { color: '#aaa' } }}
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
                                        <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.privacyPolicy}
                                                onChange={handleInputChange}
                                                name="agreeToTerms"
                                                color="primary"
                                            />
                                        }
                                        label="Nõustun andmete töötlemisega vastavalt privaatsuspoliitikale"
                                        required
                                    />
                                        <FormHelperText>
                                            <a href="/privacy-policy" style={{ color: '#aaa' }}>
                                              Loe meie privaatsuspoliitikat
                                              </a>
                                        </FormHelperText>

                                        <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
                                            <Button type="submit" variant="contained" color="#fff" sx={{
                                                flex: 1,
                                                backgroundColor: '#535bf2',
                                                '&:hover': {
                                                    backgroundColor: '#6a71f2',
                                                },
                                                color: '#fff',
                                            }}>
                                                Saada
                                            </Button>
                                            <Button onClick={handleHideForm} variant="outlined" color="secondary" sx={{
                                                flex: 1,
                                                borderColor: '#535bf2',
                                                color: '#535bf2',
                                            }}>
                                                Sulge
                                            </Button>
                                        </Box>
                                        <Snackbar
                                            open={OpenSnackbar}
                                            autoHideDuration={2000}
                                            onClose={() => setOpenSnackbar(false)}
                                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                            >
  <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
    Postitus on edukalt loodud!
  </Alert>
</Snackbar>
                                    </form>
                                </CardContent>
                            </Card>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default HomePage;
