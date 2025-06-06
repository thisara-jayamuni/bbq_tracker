
const express = require("express");
const router = express.Router();
const faultController = require("../controllers/faultReport.Controller");


router.post("/", faultController.createFaultReport);
router.get("/", faultController.getFaultReports);
router.put("/update", faultController.updateFaultreport);

module.exports = router;
