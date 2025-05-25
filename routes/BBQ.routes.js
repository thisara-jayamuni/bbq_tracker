const express = require("express");
const router = express.Router();
const bbqController = require("../controllers/bbq.Controller");
const auth = require("../middlewares/auth");

router.get("/", bbqController.getAllBBQs);              
router.post("/",auth, bbqController.createBBQ);              
router.get("/:id", bbqController.getBBQById);           
router.post("/", auth, bbqController.createBBQ);        
router.put("/:id", auth, bbqController.updateBBQ);      
router.delete("/:id", auth, bbqController.deleteBBQ);   

module.exports = router;
