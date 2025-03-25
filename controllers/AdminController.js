const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

// Admini login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kontrollime, kas e-post vastab .env-s määratud väärtusele
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(400).json({ message: "Admin not found" });
    }

    console.log("Sisend email:", email);
    console.log("Sisend parool:", password);
    console.log("Keskkonnast saadud admin email:", process.env.ADMIN_EMAIL);

    // Kontrollime parooli .env-s määratud parooliga
    const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Kuna meil pole andmebaasi, määrame admini ID käsitsi (võime kasutada näiteks '1')
    const adminId = process.env.ADMIN_ID || '1'; // Saame admini ID määrata .env failist

    // Genereerime tokeni
    const token = jwt.sign({ adminId }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      adminId, // Tagastame admini ID (võime kasutada näiteks e-posti aadressi või lihtsalt ID)
    });
  } catch (e) {
    console.error("Viga login'i protsessis:", e);
    res.status(500).json({ message: "Something went wrong. Try again later" });
  }
};
