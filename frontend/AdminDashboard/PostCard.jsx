// PostCard.jsx
const PostCard = ({ post, onAccept, onReject, onDelete }) => (
    <div
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
      <p><strong>Location:</strong> {post.location ? post.location.county : 'Not available'}</p>
      <p><strong>Course:</strong> {post.course ? post.course.course : 'Not available'}</p>
      <p><strong>Email:</strong> {post.email}</p>
      <p><strong>Phone:</strong> {post.phone}</p>
      <p><strong>Post Type:</strong> {post.postType}</p>
      <p><strong>Status:</strong> {post.status}</p>
  
      {post.images?.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <strong>Images:</strong>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {post.images.map((img, i) => (
              <img
                key={i}
                src={`http://localhost:8000/${img.fileName}`}
                alt={`Image ${i}`}
                width={100}
                style={{ borderRadius: "5px", objectFit: "cover" }}
              />
            ))}
          </div>
        </div>
      )}
  
      {/* Buttons */}
      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        {post.status === 'pending' && (
          <>
            <button style={btnStyle.green} onClick={() => onAccept(post._id)}>Accept</button>
            <button style={btnStyle.orange} onClick={() => onReject(post._id)}>Reject</button>
          </>
        )}
        <button style={btnStyle.red} onClick={() => onDelete(post._id)}>Delete</button>
      </div>
    </div>
  );
  
  const btnStyle = {
    green: { padding: "6px 10px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
    orange: { padding: "6px 10px", backgroundColor: "#ff9800", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
    red: { padding: "6px 10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }
  };
  
  export default PostCard;
  