import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Grid, Button } from '@mui/material';



const AllPosts = ({searchQuery}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


// Lae kõik postitused
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
        console.log('Fetched posts:', data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  console.log('Otsingusõna:', searchQuery);
  

  // Filtreeri postitused vastavalt otsinguküsimusele
  const filteredPosts = posts.filter((post) => {
    const name = post.name.toLowerCase();
    const location = post.location ? post.location.county.toLowerCase() : '';
    const course = post.course ? post.course.course.toLowerCase() : '';
    

    return (
      name.includes(searchQuery.toLowerCase()) ||
      location.includes(searchQuery.toLowerCase()) ||
      course.includes(searchQuery.toLowerCase())
    );
  });
 
  if (loading) {
    return <Typography variant="h6" color="textSecondary">Loading...</Typography>;
  }
  if (error) {
    return <Typography variant="h6" color="error">Error: {error}</Typography>;
  }

  
  return (
    <Box sx={{ padding: '20px' }}>
      
      <Typography variant="h4" gutterBottom>Postitused</Typography>

      {filteredPosts.length === 0 ? (
        <Typography>No accepted posts available.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Card sx={{ boxShadow: 3, borderRadius: '10px', overflow: 'hidden', backgroundColor: 'white' }}>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {post.name.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Location:</strong> {post.location ? post.location.county : 'Not available'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Course:</strong> {post.course ? post.course.course : 'Not available'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Phone:</strong> {post.phone}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Post Type:</strong> {post.postType}
                  </Typography>
                   {/* Kuvatakse postituse pildid, kui need olemas */}
                {post.images && post.images.length > 0 && (
                  <Box sx={{ marginTop: 2 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {post.images.map((img, index) => (
                        <img
                          key={index}
                          src={`http://localhost:8000/${img.fileName}`} // Asenda õigeks URL-iks, kui vaja
                          alt={`Post image ${index}`}
                          width={100}
                          style={{ borderRadius: '5px', objectFit: 'cover' }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                  
                  
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};


export default AllPosts;
