import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const AdminDashboard = () => {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [acceptedPosts, setAcceptedPosts] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login'); // Kui pole tokenit, suuna loginile
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/admin/posts', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        if (data && Array.isArray(data)) {
          // Filtreeri postitused
          setPendingPosts(data.filter(post => post.status === 'pending'));
          setAcceptedPosts(data.filter(post => post.status === 'accepted'));
        } else {
          console.log('No posts available in response');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); 

  const updatePostStatus = async (postId, action, reason = "") => {
    try {
      const response = await fetch(`http://localhost:8000/admin/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status:action, reason }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post status');
      }

      const data = await response.json();
      const updatedPost = data.post;
      

      // Uuenda postitusi pärast staatuse muutmist
      if (action === 'accept') {
        setPendingPosts(prev => prev.filter(post => post._id !== postId));
        setAcceptedPosts(prev => [...prev, updatedPost]);
      } else {
        setPendingPosts(prev => prev.filter(post => post._id !== postId));
      }
    } catch (error) {
      console.error('Error updating post status:', error);
    }
  };

  const handleAccept = (postId) => {
    updatePostStatus(postId, 'accept');
  };

  const handleReject = (postId) => {
    const reason = prompt('Palun sisestage tagasilükkimise põhjus:');

    if (reason === null){
      return
    }
    if (!reason || reason.trim() === '') {
      alert('Tagasilükkimise põhjus on nõutud.');
      return;
    }
    updatePostStatus(postId, 'reject', reason);
   
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8000/admin/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Eemalda postitused nii pending kui accepted listidest
      setPendingPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      setAcceptedPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
<Box sx={{ padding: 4 }}>
      {/* Pending Posts Accordion */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Pending Posts ({pendingPosts.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {pendingPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <PostCard
                  post={post}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Accepted Posts Accordion */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Accepted Posts ({acceptedPosts.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {acceptedPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <PostCard
                  post={post}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};


export default AdminDashboard;
