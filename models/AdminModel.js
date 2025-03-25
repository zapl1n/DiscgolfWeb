const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: true, // Kui kasutaja on admin
    },
  },
  { timestamps: true }
); // Automaatne loomise ja uuendamise kuupäev

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
