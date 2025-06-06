const Job = require('../models/Job');

const createJob = async (jobData) => {
  return await Job.create(jobData);
};

const getAllJobs = async () => {
  return await Job.find().populate('bbqId').populate('assignedTo');
};

const getJobsByCleaner = async (cleanerId) => {
  const jobs = await Job.find({ assignedTo: cleanerId }).populate('bbqId').sort({ createdAt: -1 });
  return jobs.map(job => ({
    _id: job._id,
    bbqName: job.bbqId?.name || 'Unknown',
    scheduledTime: job.createdAt,
    status: job.status
  }));
};

const assignJobToCleaner = async ({ jobId, cleanerId, supervisorId }) => {
  const job = await Job.findById(jobId);
  if (!job) throw new Error('Job not found');

  job.workedBy = cleanerId;
  job.status = 'Assigned';
  job.jobHistory.push({
    action: 'Assigned',
    performedBy: supervisorId
  });

  await job.save();
  return job;
};

const getJobsBySupervisor = async (supervisorId) => {
  return await Job.find({ assignedTo: supervisorId })
    .populate('bbqId')
    .populate('assignedTo');
};

const getJobsByWorkedBy = async (cleanerId) => {
  return await Job.find({ workedBy: cleanerId })
    .populate('bbqId')
    .populate('assignedTo')
    .populate('workedBy');
};

const updateJobStatus = async ({ jobId, status, remarks, userId, userRole }) => {
  const job = await Job.findById(jobId);
  if (!job) throw new Error('Job not found');

  // if (userRole === 'cleaner' && job.assignedTo.toString() !== userId.toString()) {
  //   const err = new Error('You are not allowed to update this task');
  //   err.status = 403;
  //   throw err;
  // }

  if (status === 'In Progress') {
    job.status = 'In Progress';
    job.attendedAt = new Date();
    job.jobHistory.push({ action: 'Attended', performedBy: userId });
  } else if (status === 'Completed') {
    job.status = 'Completed';
    job.completedAt = new Date();
    job.remarks = remarks || job.remarks;
    job.jobHistory.push({ action: 'Completed', performedBy: userId });
  } else {
    const err = new Error('Invalid status update');
    err.status = 400;
    throw err;
  }

  await job.save();
  return job;
};

module.exports = {
  createJob,
  getAllJobs,
  getJobsByCleaner,
  assignJobToCleaner,
  getJobsBySupervisor,
  getJobsByWorkedBy,
  updateJobStatus
};
