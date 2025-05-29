const Device = require('../models/Device');

const registerDevice = async ({ deviceId, sim, bbqId }) => {
  const existing = await Device.findOne({ deviceId });
  if (existing) {
    throw new Error('Device already registered');
  }

  const device = new Device({ deviceId, sim, bbqId });
  return await device.save();
};

const updateDevice = async (id, data) => {
  const updatedDevice = await Device.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedDevice) {
    throw new Error('Device not found');
  }

  return updatedDevice;
};

const getAllDevices = async () => {
  return await Device.find().populate('bbqId');
};

module.exports = {
  registerDevice,
  updateDevice,
  getAllDevices,
};
