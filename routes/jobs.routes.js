const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobs.controller');
const auth = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/role.middleware');

router.post('/', auth, authorizeRoles('admin','supervisor','cleaner','InternalService'),jobsController.createJob);
router.get('/', auth, authorizeRoles('admin'),jobsController.getJobs);
router.put('/:id', auth, authorizeRoles('admin','cleaner','supervisor','InternalService'),jobsController.updateJobStatus);
router.put('/assign', auth, authorizeRoles('admin','cleaner','supervisor','InternalService'),jobsController.assignToCleaner);
router.get('/supervisorJob/:id', auth, authorizeRoles('cleaner','admin','InternalService'), jobsController.getsupervisorjob);
router.get('/cleanerJob/:id', auth, authorizeRoles('cleaner','admin','InternalService'), jobsController.getcleanserjob);

module.exports = router;
