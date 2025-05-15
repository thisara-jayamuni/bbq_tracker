const express = require("express");
const router = express.Router();
const bbqController = require("../controllers/bbq.Controller");
const auth = require("../middlewares/auth");

router.get("/", bbqController.getAllBBQs);              // Public
router.post("/",auth, bbqController.createBBQ);              // Protected
router.get("/:id", bbqController.getBBQById);           // Optional
router.put("/:id", auth, bbqController.updateBBQ);      // Protected
router.delete("/:id", auth, bbqController.deleteBBQ);   // Protected

module.exports = router;
