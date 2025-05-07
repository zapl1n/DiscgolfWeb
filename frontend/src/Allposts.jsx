import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Grid, Button } from '@mui/material';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Laadimine postitusi API-st
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/posts'); // Endpoint, mis tagastab kõik "accepted" postitused
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  console.log('Posts:', posts);

  if (loading) {
    return <Typography variant="h6" color="textSecondary">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error: {error}</Typography>;
  }

  
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Postitused</Typography>

      {posts.length === 0 ? (
        <Typography>No accepted posts available.</Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
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
                 

                  {/* Kuvatakse pildid, kui need on olemas */}
                  {post.images && post.images.length > 0 && (
                  
                    <Box sx={{ marginTop: 2 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {post.images.map((img, index) => (
                          <img
                            key={index}
                            src={`http://localhost:8000/${img.fileName}`}
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
