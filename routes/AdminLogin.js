const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/AdminLogin");

router.post("/login", loginAdmin);

module.exports = router;
