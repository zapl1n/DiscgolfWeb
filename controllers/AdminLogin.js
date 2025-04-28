const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModel");

// Admini login
exports.loginAdmin = async (req, res) => {
  try {

    //Võtame andmed body-st
    const { email, password } = req.body;
  
    //Otsime admin konto andmebaasist
    const admin = await Admin.findOne({ email });

    // Logime Admini konto andmed
    console.log('Admin andmebaasist: ', admin);

    //Kontrollime, kas admin konto on olemas
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    //Kontrollime, kas parool on õige
    // bcrypt.compare võrdleb parooli, mis on saadetud body-st ja andmebaasis oleva parooliga
    const isMatch = await bcrypt.compare(password, admin.password);

    // Logime paroolide võrdlemise tulemuse
    console.log('Paroolid võrreldud: ', isMatch);

    //Kontrollime, kas paroolid ühtivad
    // Kui ei ühti, siis tagastame 400 vea
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    //Kui kõik on korras, siis genereerime JWT tokeni
    // JWT token sisaldab admini ID-d ja rolli
    // Token kehtib 1 tund
    const token = jwt.sign({ id: admin._id, role:admin.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Väljastame tokeni ja admini ID
    // Token saadetakse kliendile, et seda kasutada edaspidi
    // Admini ID saadetakse kliendile, et seda kasutada edaspidi
   
    res.json({
      message: "Login successful",
      token,
      adminId: admin._id,
    });

    // Püüame kinni kõik vead, mis võivad tekkida
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
