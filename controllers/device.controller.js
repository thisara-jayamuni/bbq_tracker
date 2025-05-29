const Device = require('../models/Device');

const registerDevice = async (req, res) => {
  try {
    const { deviceId, sim, bbqId } = req.body;

    // Check for existing device
    const existing = await Device.findOne({ deviceId });
    if (existing) return res.status(409).json({ message: 'Device already registered' });

    const device = new Device({ deviceId, sim, bbqId });
    await device.save();

    res.status(201).json(device);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedDevice = await Device.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedDevice) {
      return res.status(404).json({ message: 'Device not found' });
    }

    res.status(200).json(updatedDevice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find().populate('bbqId');
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerDevice,
  updateDevice,
  getAllDevices
};