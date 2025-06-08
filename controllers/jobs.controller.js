const jobService = require('../services/job.service');

const createJob = async (req, res) => {
  try {
    const job = await jobService.createJob(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyTasks = async (req, res) => {
  try {
    const tasks = await jobService.getJobsByCleaner(req.user._id);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

const assignToCleaner = async (req, res) => {
  try {
    const { jobId, cleanerId } = req.body;
    const supervisorId = req.user._id;

    const job = await jobService.assignJobToCleaner({ jobId, cleanerId, supervisorId });
    res.status(200).json({ message: 'Cleaner assigned to job', job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getsupervisorjob = async (req, res) => {
  try {
    const jobs = await jobService.getJobsBySupervisor(req.params.id);
    res.status(200).json({ supervisorJobs: jobs });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch supervisor jobs' });
  }
};

const getcleanserjob = async (req, res) => {
  try {
    const jobs = await jobService.getJobsByWorkedBy(req.params.id);
    res.status(200).json({ cleanerJobs: jobs });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cleaner jobs' });
  }
};

const updateJobStatus = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const { status, remarks } = req.body;

    const job = await jobService.updateJobStatus({
      jobId,
      status,
      remarks,
      userId: req.user.userId,
      userRole: req.user.role
    });

    res.status(200).json({ message: `Job marked as ${status}`, job });
  } catch (error) {
    const statusCode = error.status || 400;
    res.status(statusCode).json({ message: error.message });
  }
};

module.exports = {
  createJob,
  getJobs,
  getMyTasks,
  updateJobStatus,
  assignToCleaner,
  getsupervisorjob,
  getcleanserjob
};
