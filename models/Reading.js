const mongoose = require("mongoose");

const readingSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  sim: { type: String },
  latitude: Number,
  longitude: Number,
  temperature: Number,
  HotPlate1Temp: Number,
  HotPlate2Temp: Number,
  ShellTemp: Number,
  sensor: {
    Voltage: Number,
    SignalStrength: Number
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reading", readingSchema);
