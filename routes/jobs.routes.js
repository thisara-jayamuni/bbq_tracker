const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobs.controller');
const auth = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/role.middleware');

router.post('/', auth, authorizeRoles('admin','supervisor','cleaner'),jobsController.createJob);
router.get('/', auth, authorizeRoles('admin'),jobsController.getJobs);
router.put('/:id', auth, authorizeRoles('admin','cleaner','supervisor'),jobsController.updateJobStatus);

router.get('/my-tasks', auth, authorizeRoles('cleaner','admin','InternalService'), jobsController.getMyTasks);

module.exports = router;
