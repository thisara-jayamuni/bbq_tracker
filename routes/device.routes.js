const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/device.controller.js');
const auth = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/role.middleware');

router.get('/', auth, authorizeRoles('*','InternalService'), deviceController.getAllDevices);
router.post('/', auth, authorizeRoles('admin','InternalService'), deviceController.registerDevice);
router.put('/:id', auth, authorizeRoles('admin',"InternalService"), deviceController.updateDevice);

module.exports = router