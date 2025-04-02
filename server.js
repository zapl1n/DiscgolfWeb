const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");



const AdminLogin = require("./routes/AdminLogin");
const AdminLogOut = require("./routes/AdminLogOut");
const Post = require("./routes/Posts");

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/admin", AdminLogin);
app.use("/admin", AdminLogOut);
app.use("/posts", Post);


const PORT = process.env.PORT || 8000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
