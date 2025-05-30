const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const AdminLogin = require("./routes/AdminLogin");
const AdminLogOut = require("./routes/AdminLogOut");
const CoursesRoutes = require("./routes/CoursesRoutes");
const Post = require("./routes/Posts");
const adminPostRoutes = require("./routes/adminPostRoutes");
const cleanUpOldPosts = require("./services/cleanUpOldPosts");

connectDB();


const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  })
);



app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/admin", AdminLogin);
app.use("/admin", AdminLogOut);
app.use("/posts", Post);
app.use("/admin", adminPostRoutes);
app.use("/", CoursesRoutes);

cleanUpOldPosts();

const PORT = process.env.PORT || 8000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
