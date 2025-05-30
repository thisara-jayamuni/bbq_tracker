const faultService = require('../services/faultReport.service');

const createFaultReport = async (req, res) => {
  try {
    const report = await faultService.createFaultReport(req.body);
    res.status(201).json(report);
  } catch (error) {
    const status = error.message === "BBQ not found" ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
};

const getFaultReports = async (req, res) => {
  try {
    const faults = await faultService.getFaultReports(req.query);
    res.status(200).json(faults);
  } catch (error) {
    res.status(500).json({ error: "Server error retrieving faults" });
  }
};

const updateFaultreport = async (req, res) => {
  try {
    const updated = await faultService.updateFaultReport(req.body);
    res.status(200).json(updated);
  } catch (error) {
    const status = error.message === "Fault report not found" ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
};

module.exports = {
  createFaultReport,
  getFaultReports,
  updateFaultreport,
};
