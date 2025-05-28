const Job = require('../models/Job');

const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('bbqId').populate('assignedTo');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateJobStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const { status, remarks } = req.body;
    if (status === 'In Progress') {
      job.status = status;
      job.attendedAt = new Date();
    } else if (status === 'Completed') {
      job.status = status;
      job.completedAt = new Date();
      job.remarks = remarks || job.remarks;
    } else {
      job.status = status;
    }

    await job.save();
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createJob, getJobs, updateJobStatus };
