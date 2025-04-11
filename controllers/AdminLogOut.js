
// Impordime redise
const redisClient = require("../redisClient")



const logoutAdmin = async (req, res) => {
  try {

    // Võtame headerist tokeni
    // Kui tokenit ei ole, siis tagastame 401 vea
    // Kui token on olemas, siis lisame selle redisesse
    // Token kehtib 1 tund
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    await redisClient.setEx(token, 3600, "Blacklisted");
    res.status(200).json({ message: "Logged out successfully" });
    
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  
  }
}

module.exports = logoutAdmin