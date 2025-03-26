const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

AdminSchema.pre("save", async function (next) {
  const admin = this;

  if (admin.isModified("password")) {
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    admin.password = hashedPassword;
    next();
  }
});

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;
