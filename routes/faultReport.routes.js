
const express = require("express");
const router = express.Router();
const faultController = require("../controllers/faultReport.Controller");

// Example: POST /api/faults
router.post("/", faultController.createFaultReport);
router.get("/", faultController.getFaultReports);

module.exports = router;
