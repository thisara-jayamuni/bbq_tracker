const mongoose = require('mongoose');

const StatusLogSchema = new mongoose.Schema({
  bbq: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BBQ',
    required: true,
  },
  status: {
    type: String,
    enum: ['Working', 'Faulty', 'Cleaning Required', 'Offline'],
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  notes: String,
});

module.exports = mongoose.model('StatusLog', StatusLogSchema);
