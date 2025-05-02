import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [posts, setPosts] = useState([]);
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
                console.log('Fetched posts:', data); // Logige kogu API vastus

                // Veenduge, et andmed on õigesti saadud
                if (data && Array.isArray(data)) { // Kontrollige, kas andmed on massiiv
                    setPosts(data); 
                } else {
                    console.log('No posts available in response');
                }

            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []); // Siin saame olla kindlad, et see töötab ainult kord, kui komponent esmakordselt laaditakse

    console.log('Current posts state:', posts); // Logige, mis on hetkel posts massiiv

    return (
        <div style={{ padding: "20px" }}>
    {posts.length === 0 ? (
        <p>No posts found.</p>
    ) : (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
            }}
        >
            {posts.map((post) => (
                <div
                    key={post._id}
                    style={{
                        border: "1px solid #ddd",
                        padding: "15px",
                        borderRadius: "10px",
                        backgroundColor: "#0000",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>{post.name}</h3>
                    <p><strong>Created:</strong> {new Date(post.createdAt).toLocaleString()}</p>
                    <p><strong>Email:</strong> {post.email}</p>
                    <p><strong>Phone:</strong> {post.phone}</p>
                    <p><strong>Post Type:</strong> {post.postType}</p>
                    <p><strong>Status:</strong> {post.status}</p>

                    {/* Images */}
                    {post.images && post.images.length > 0 && (
                        <div style={{ marginTop: "10px" }}>
                            <strong>Images:</strong>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                                {post.images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:8000/${img.fileName}`}
                                        alt={`Image ${index}`}
                                        width={100}
                                        style={{ borderRadius: "5px", objectFit: "cover" }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                        <button 
                            style={{ padding: "6px 10px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                            onClick={() => handleAccept(post._id)}
                        >
                            Accept
                        </button>
                        <button 
                            style={{ padding: "6px 10px", backgroundColor: "#ff9800", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                            onClick={() => handleReject(post._id)}
                        >
                            Reject
                        </button>
                        <button 
                            style={{ padding: "6px 10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                            onClick={() => handleDelete(post._id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )}
</div>
    );
};

export default AdminDashboard;
