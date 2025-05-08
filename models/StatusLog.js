const mongoose = require("mongoose");

const statusLogSchema = new mongoose.Schema({
  bbqId: { type: mongoose.Schema.Types.ObjectId, ref: "BBQ", required: true },
  oldStatus: String,
  newStatus: String,
  changedAt: { type: Date, default: Date.now },
  source: { type: String, enum: ["cron", "manual", "iot"], default: "manual" }
});

module.exports = mongoose.model("StatusLog", statusLogSchema);
