const express = require('express');
const router = express.Router();
const readingsController = require('../controllers/reading.controller.js');

router.post('/', readingsController.addReading);

module.exports = router