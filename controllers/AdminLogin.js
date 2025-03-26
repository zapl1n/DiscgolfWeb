const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModel");

// Admini login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Otsime admin konto andmebaasist
    const admin = await Admin.findOne({ email });



    console.log('Admin andmebaasist: ', admin);

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    console.log('Sisestatud parool: ', password);
console.log('Hashitud parool andmebaasis: ', admin.password);

    const isMatch = await bcrypt.compare(password, admin.password);

    console.log('Paroolid võrreldud: ', isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      message: "Login successful",
      token,
      adminId: admin._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
