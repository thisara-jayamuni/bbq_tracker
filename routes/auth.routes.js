const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/auth.controller');

// Login route
router.post('/login', authcontroller.login);

module.exports = router;
