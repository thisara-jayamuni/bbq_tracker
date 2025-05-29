const mongoose = require("mongoose");

const faultReportSchema = new mongoose.Schema({
  bbqId: { type: mongoose.Schema.Types.ObjectId, ref: "BBQ", required: true },
  bbqName: { type: String },
  reporterName: { type: String, required: true },
  issue: { type: String, required: true },
  status: { type: String, default: "Pending" },
  reportedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FaultReport", faultReportSchema);