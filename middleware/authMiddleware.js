const jwt = require("jsonwebtoken");
const redisClient = require("../redisClient");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Eeldame, et token saadetakse autoriseerimise päises

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const isTokenBlacklisted = await redisClient.get(`blacklist:${token}`);
    if (isTokenBlacklisted) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("req.user:", req.user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
