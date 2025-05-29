const FaultReport = require("../models/FaultReport");
const BBQ = require("../models/BBQ");

const createFaultReport = async (req, res) => {
 try {
    const { bbqId, reporterName, issue } = req.body;

    const bbq = await BBQ.findById(bbqId);
    if (!bbq) {
      return res.status(404).json({ error: "BBQ not found" });
    }

    const report = new FaultReport({
      bbqId,
      bbqName: bbq.name,
      reporterName,
      issue
    });

    await report.save();
    res.status(201).json(report);
  } catch (error) {
    console.error("Error creating fault report:", error);
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

const updateFaultreport = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updateData = req.body;

    const updated = await FaultReport.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      return res.status(404).json({ error: "Fault report not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating fault report:", error);
    res.status(500).json({ error: "Server error updating fault report" });
  }
};

module.exports = {
  createFaultReport,
  getFaultReports,
  updateFaultreport,
};