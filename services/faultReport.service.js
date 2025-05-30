const FaultReport = require("../models/FaultReport");
const BBQ = require("../models/BBQ");

const createFaultReport = async ({ bbqId, reporterName, issue }) => {
  const bbq = await BBQ.findById(bbqId);
  if (!bbq) {
    throw new Error("BBQ not found");
  }

  const report = new FaultReport({
    bbqId,
    bbqName: bbq.name,
    reporterName,
    issue
  });

  return await report.save();
};

const getFaultReports = async (query) => {
  const filters = {};

  if (query.bbqId) {
    filters.bbqId = query.bbqId;
  }

  if (query.status) {
    filters.status = query.status;
  }

  if (query.reportedBy) {
    filters.reportedBy = { $regex: query.reportedBy, $options: "i" };
  }

  return await FaultReport.find(filters).sort({ createdAt: -1 });
};

const updateFaultReport = async ({ id, status }) => {
  const updated = await FaultReport.findByIdAndUpdate(id, { status }, { new: true });
  if (!updated) {
    throw new Error("Fault report not found");
  }
  return updated;
};

module.exports = {
  createFaultReport,
  getFaultReports,
  updateFaultReport
};
