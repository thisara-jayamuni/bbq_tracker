const express = require("express");
const router = express.Router();
const bbqController = require("../controllers/bbq.Controller");
const authorizeRoles = require('../middlewares/role.middleware');
const auth = require("../middlewares/auth");

router.get("/", bbqController.getBBQs);           
router.post("/", auth, authorizeRoles('user','InternalService'),bbqController.createNew);            
router.get("/:id", bbqController.getById);      
router.put("/:id", auth, bbqController.updateById);      
router.delete("/:id", auth, bbqController.deleteById);   

module.exports = router;
