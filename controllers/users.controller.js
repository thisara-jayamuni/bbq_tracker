const { get, add, update, remove } = require('../services/users.service');

const getUsers = async (req, res) => {
  try {
    const users = await get();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: { error } });
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = await add(req.body);
    res.status(200).json({ newUser });
  } catch (error) {
    res.status(500).json({ message: { error } });
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

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
