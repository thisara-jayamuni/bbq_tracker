const User = require('../models/User');

const get = async () => {
  try {
    return await User.find().select('-password');
    // return null;
  } catch (error) {
    console.error('AddUser Controller Error:', error.message);
    throw error;
  }
};

const getById = async (id) => {
  try {
    return await User.findById(id).select('-password');
    // return null;
  } catch (error) {
    console.error('AddUser Controller Error:', error.message);
    throw error;
  }
};

const add = async (projectData) => {
  try {
    const existingUser = await User.findOne({ email: projectData.email });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const user = new User(projectData);
    const savedUser = await user.save();

    const userObj = savedUser.toObject();
    delete userObj.password;

    return userObj;
  } catch (error) {
    console.error('AddUser Controller Error:', error.message);
    throw error;
  }
};

const updateById = async (id, projectData) => {
  try {
    return await User.findByIdAndUpdate(id, projectData, { new: true });
    // return null;
  } catch (error) {
    console.error('AddUser Controller Error:', error.message);
    throw error;
  }
};

const removeById = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
    // return null;
  } catch (error) {
    console.error('AddUser Controller Error:', error.message);
    throw error;
  }
};

const getByEmail = async (email, includePassword = false) => {
  if (includePassword) {
    return await User.findOne({ email });
  }
  return await User.findOne({ email }).select('-password');
};

const updateByEmail = async (email, data) => {
  return await User.findOneAndUpdate({ email }, data, { new: true });
};

const removeByEmail = async (email) => {
  return await User.findOneAndDelete({ email });
};

const getByRole = async (role) => {
  try {
    return await User.find({role: role});
    // return null;
  } catch (error) {
    console.error('Get by role Controller Error:', error.message);
    throw error;
  }
};

module.exports = {
  get,
  add,
  updateById,
  removeById,
  getById,
  getByEmail,
  updateByEmail,
  removeByEmail,
  getByRole
};
