const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  bbqId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BBQ',
    required: true
  },
  raisedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  jobHistory: [{
    action: {
      type: String,
      enum: ['Pending','Created', 'Assigned', 'Attended', 'In Progress', 'Completed', 'Cancelled'],
      required: true
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['Pending','Created', 'Assigned', 'Attended', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  type: {
    type: String,
    enum: ['Clean', 'Repair', 'Inspection'],
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  attendedAt: Date,
  completedAt: Date,
  remarks: String
});

module.exports = mongoose.model('Job', JobSchema);
