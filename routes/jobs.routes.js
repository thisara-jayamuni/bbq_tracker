const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobs.controller');
const auth = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/role.middleware');

router.post('/', auth, authorizeRoles(jobsController.createJob));
router.get('/', auth, authorizeRoles(jobsController.getJobs));
router.put('/:id', auth, authorizeRoles(jobsController.updateJobStatus));

module.exports = router;
