
import { useEffect, useState } from 'react';

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
        <div>
            <h1>Tere tulemast!</h1>
            <button onClick={handleShowForm}>Lisa uus postitus</button>
            {confirmation && <p style={{color:'green',marginTop: '1rem'}}>{confirmation}</p>}
            {isFormVisible && (
                <div>
                    <h2>Lisa uus postitus</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nimi:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Asukoht:</label>
                            <select name="county" value={formData.county} onChange={handleInputChange} required>
                            <option value=''>Vali maakond</option>
                            {counties.map((county) => (
                                <option key={county} value={county}>
                                    {county}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div>
                        <label>Rada:</label>
                            <select name="course" value={formData.course} onChange={handleInputChange} required>
                            <option value=''>Vali Rada</option>
                            {courses.map((course) => (
                                <option key={course} value={course}>
                                    {course}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div>
                            <label>Pildi üleslaadimine:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Telefon:</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Postituse tüüp:</label>
                            <select
                                name="postType"
                                value={formData.postType}
                                onChange={handleInputChange}
                            >
                                <option value="lost">Kadunud</option>
                                <option value="found">Leitud</option>
                            </select>
                        </div>
                        <button type="submit">Saada</button>
                    </form>
                    <button onClick={handleHideForm}>Sulge</button>
                </div>

            )}

            </div>
        );
}

      

        

            export default HomePage;

           