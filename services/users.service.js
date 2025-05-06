// const User = require('../models/users');

exports.get = async () => {
  try {
    // return await User.find();
    return null;
  } catch (error) {
    throw new Error('Could not fetch users');
  }
};

exports.add = async (projectData) => {
  try {
    // const user = new User(projectData);
    // return await user.save();
    return null;
  } catch (error) {
    throw new Error('Could not add user');
  }
};

exports.update = async (id, projectData) => {
  try {
    // return await User.findByIdAndUpdate(id, projectData, { new: true });
    return null;
  } catch (error) {
    throw new Error('Could not update user');
  }
};

exports.remove = async (id) => {
  try {
    // return await User.findByIdAndDelete(id);
    return null;
  } catch (error) {
    throw new Error('Could not delete user');
  }
};
