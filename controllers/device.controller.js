const Device = require('../models/Device');

exports.registerDevice = async (req, res) => {
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


module.exports = {
  registerDevice: exports.registerDevice,
  // Add other device-related functions here as needed
};