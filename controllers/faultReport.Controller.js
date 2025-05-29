const FaultReport = require("../models/FaultReport");

const createFaultReport = async (req, res) => {
  try {
    const report = new FaultReport(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFaultReports = async (req, res) => {
  try {
    const filters = {};

    if (req.query.bbqId) {
      filters.bbqId = req.query.bbqId;
    }

    if (req.query.status) {
      filters.status = req.query.status;
    }

    if (req.query.reportedBy) {
      filters.reportedBy = { $regex: req.query.reportedBy, $options: "i" }; // case-insensitive match
    }

    const faults = await FaultReport.find(filters).sort({ createdAt: -1 });
    res.status(200).json(faults);
  } catch (error) {
    console.error("Error retrieving fault reports:", error);
    res.status(500).json({ error: "Server error retrieving faults" });
  }
};

module.exports = {
  createFaultReport,
  getFaultReports
};