const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers');

router.get('/', usersController.getUsers);
router.post('/', usersController.addUser);
router.get('/email/:email', usersController.getUserByEmail);
router.put('/email/:email', usersController.updateUserByEmail);
router.delete('/email/:email', usersController.deleteUserByEmail);
router.get('/id/:id', usersController.getUserById);
router.put('/id/:id', usersController.updateUserById);
router.delete('/id/:id', usersController.deleteUserByEmail);
router.get('/role/:role', usersController.getUserByRole);

module.exports = router;
