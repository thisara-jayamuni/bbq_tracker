const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  sim: { type: String, required: true },
  bbqId: { type: mongoose.Schema.Types.ObjectId, ref: "BBQ" },
  registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Device", deviceSchema);