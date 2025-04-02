const jwt = require("jsonwebtoken");
const redisClient = require("../redisClient")

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
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
