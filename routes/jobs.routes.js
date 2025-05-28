const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobs.controller');
const auth = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/role.middleware');

router.post('/', auth, authorizeRoles('admin'),jobsController.createJob);
router.get('/', auth, authorizeRoles(),jobsController.getJobs);
router.put('/:id', auth, authorizeRoles('admin'),jobsController.updateJobStatus);

module.exports = router;
