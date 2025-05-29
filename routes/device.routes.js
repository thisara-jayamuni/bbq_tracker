const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/device.controller.js');
const auth = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/role.middleware');

// Register a new device (admin only)
router.post('/', auth, authorizeRoles('admin','InternalService'), deviceController.registerDevice);
router.post('/', deviceController.addReading);

module.exports = router