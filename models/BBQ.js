const mongoose = require('mongoose');

const BBQSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
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

BBQSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('BBQ', BBQSchema);
