const mongoose = require('mongoose');

const BBQSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  status: {
    type: String,
    enum: ['Working', 'Faulty', 'Cleaning Required', 'Offline'],
    default: 'Working',
  },
  lastCleaned: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add geospatial index
BBQSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('BBQ', BBQSchema);
