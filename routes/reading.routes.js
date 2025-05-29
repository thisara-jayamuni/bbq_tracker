const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.js');
const authorizeRoles = require('../middlewares/role.middleware');
const readingsController = require('../controllers/reading.controller.js');

router.post('/', auth, authorizeRoles('InternalService'),readingsController.addReading);

module.exports = router