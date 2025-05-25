const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers');

router.get('/', usersController.getUsers);
router.post('/', usersController.addUser);
router.get('/email/:email', usersController.getUserByEmail);
router.put('/email/:email', usersController.updateUserByEmail);
router.delete('/email/:email', usersController.deleteUserByEmail);

module.exports = router;
