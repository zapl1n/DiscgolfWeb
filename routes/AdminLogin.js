
const express = require('express');
const router = express.Router();
const {loginAdmin} = require('../controllers/AdminController');

router.post('/login', (req, res, next) => {
    console.log('POST päring jõudis AdminLogin routerisse');
    next(); // Jätkab järgmise funktsiooni täitmist
  }, loginAdmin);  // Edasi saadetakse päring loginAdmin funktsiooni
  

module.exports = router;