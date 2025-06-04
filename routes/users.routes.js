const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers');
const auth = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/role.middleware');

router.get('/', auth, authorizeRoles('admin','InternalService'),usersController.getUsers);
router.post('/',usersController.addUser);
router.get('/email/:email', auth, authorizeRoles('admin','InternalService'),usersController.getUserByEmail);
router.put('/email/:email', auth, authorizeRoles('admin','InternalService'),usersController.updateUserByEmail);
router.delete('/email/:email',auth, authorizeRoles('admin','InternalService'),usersController.deleteUserByEmail);
// router.get('/id/:id', usersController.getUserById);
router.get('/id/:id', auth, authorizeRoles('admin','InternalService'),usersController.getUserById);
router.put('/id/:id',  auth, authorizeRoles('admin','InternalService'),usersController.updateUserById);
router.patch('/id/:id', auth, authorizeRoles('admin','InternalService'),usersController.deleteUserById);
router.get('/role/:role', auth, authorizeRoles('*','InternalService'),usersController.getUserByRole);

module.exports = router;
