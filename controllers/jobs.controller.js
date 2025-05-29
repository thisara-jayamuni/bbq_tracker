const Job = require('../models/Job');

const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all jobs (admin use)
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('bbqId').populate('assignedTo');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get jobs assigned to the current cleaner
const getMyTasks = async (req, res) => {
  try {
    const cleanerId = req.user._id;

    const jobs = await Job.find({ assignedTo: cleanerId })
      .populate('bbqId')
      .sort({ createdAt: -1 });

    const formattedJobs = jobs.map(job => ({
      _id: job._id,
      bbqName: job.bbqId?.name || 'Unknown',
      scheduledTime: job.createdAt,
      status: job.status
    }));

    res.status(200).json({ tasks: formattedJobs });
  } catch (error) {
    console.error('Error fetching cleaner tasks:', error.message);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};
const assignToCleaner = async (req, res) => {
  try {
    const { jobId, cleanerId } = req.body;
    const supervisorId = req.user._id; 

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.workedBy = cleanerId;
    job.status = 'Assigned';

    job.jobHistory.push({
      action: 'Assigned',
      performedBy: supervisorId
    });

    await job.save();

    res.status(200).json({ message: 'Cleaner assigned to job', job });
  } catch (error) {
    console.error('Error assigning job:', error.message);
    res.status(500).json({ message: error.message });
  }
};


const getsupervisorjob = async (req, res) => {
  try {
    const supervisorId = req.params.id;

    const jobs = await Job.find({ assignedTo: supervisorId })
      .populate('bbqId')
      .populate('assignedTo');

    res.status(200).json({ supervisorJobs: jobs });
  } catch (error) {
    console.error('Error fetching supervisor jobs:', error.message);
    res.status(500).json({ message: 'Failed to fetch supervisor jobs' });
  }
};

const getcleanserjob = async (req, res) => {
  try {
    const cleanerId = req.params.id;

    const jobs = await Job.find({ workedBy: cleanerId })
      .populate('bbqId')
      .populate('assignedTo')
      .populate('workedBy');

    res.status(200).json({ cleanerJobs: jobs });
  } catch (error) {
    console.error('Error fetching cleaner jobs:', error.message);
    res.status(500).json({ message: 'Failed to fetch cleaner jobs' });
  }
};

const updateJobStatus = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { status, remarks } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (userRole === 'cleaner' && job.assignedTo.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You are not allowed to update this task' });
    }

    if (status === 'In Progress') {
      job.status = 'In Progress';
      job.attendedAt = new Date();
      job.jobHistory.push({
        action: 'Attended',
        performedBy: userId
      });
    } else if (status === 'Completed') {
      job.status = 'Completed';
      job.completedAt = new Date();
      job.remarks = remarks || job.remarks;
      job.jobHistory.push({
        action: 'Completed',
        performedBy: userId
      });
    } else {
      return res.status(400).json({ message: 'Invalid status update' });
    }

    await job.save();
    res.status(200).json({ message: `Job marked as ${status}`, job });
  } catch (error) {
    console.error('Job update error:', error.message);
    res.status(400).json({ message: error.message });
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
