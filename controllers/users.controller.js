const {
  get, add, getById, getByEmail, updateById, removeById, updateByEmail, removeByEmail, getByRole
} = require('../services/users.service');


const getUsers = async (req, res) => {
  try {
    const users = await get();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = await add(req.body);
    res.status(200).json({ newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await getById(req.params.id);
    if (!user || validateUserState(user)) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateUserById = async (req, res) => {
  try {
    const updatedUser = await updateById(req.params.id, req.body);
    if (!updatedUser || validateUserState(updatedUser)) {
      return res.status(404).json({ message: 'User not found or inactive' });
    }
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await removeById(req.params.id, req.body.status);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const user = await getByEmail(req.params.email);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserByEmail = async (req, res) => {
  try {
    const updated = await updateByEmail(req.params.email, req.body);
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteUserByEmail = async (req, res) => {
  try {
    const deleted = await removeByEmail(req.params.email);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getUserByRole = async (req, res) => {
  try {
    const role = req.params.role.toLowerCase();
    const users = await getByRole(role);
    const activeUsers = users.filter(user => user.status === true);

    if (activeUsers.length === 0) {
      return res.status(404).json({ message: 'No active users found for this role' });
    }

    res.status(200).json({ users: activeUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const validateUserState = (user) => {
  return !user.status;
};

module.exports = {
  getUsers,
  addUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByEmail,
  updateUserByEmail,
  deleteUserByEmail,
  getUserByRole
};
