const {  get, add, getById, getByEmail, updateByEmail, removeByEmail} = require('../services/users.service');

const getUsers = async (req, res) => {
  try {
    const users = await get();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: { error } });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await getById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: { error: error.message } });
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = await add(req.body);
    res.status(200).json({ newUser });
  } catch (error) {
    res.status(500).json({ message: {  error: error.message } });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await update(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ message: { error } });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await remove(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ deletedUser });
  } catch (error) {
    res.status(500).json({ message: { error } });
  }
};
const getUserByEmail = async (req, res) => {
  try {
    const user = await getByEmail(req.params.email);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserByEmail = async (req, res) => {
  try {
    const updated = await updateByEmail(req.params.email, req.body);
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUserByEmail = async (req, res) => {
  try {
    const deleted = await removeByEmail(req.params.email);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  updateUserByEmail,
  deleteUserByEmail
};
