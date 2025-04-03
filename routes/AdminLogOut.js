const express = require("express");
const logoutAdmin = require("../controllers/AdminLogOut")
const { authMiddleware } = require("../middleware/authMiddleware")
const router = express.Router();


console.log(logoutAdmin);

console.log({ authMiddleware });
// Admini väljalogimise marsruut
router.post("/logout", authMiddleware, logoutAdmin);

module.exports = router;
