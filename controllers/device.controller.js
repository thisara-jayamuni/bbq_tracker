const deviceService = require('../services/device.service');

const registerDevice = async (req, res) => {
  try {
    const device = await deviceService.registerDevice(req.body);
    res.status(201).json(device);
  } catch (err) {
    const status = err.message === 'Device already registered' ? 409 : 500;
    res.status(status).json({ message: err.message });
  }
};

const updateDevice = async (req, res) => {
  try {
    const updated = await deviceService.updateDevice(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    const status = err.message === 'Device not found' ? 404 : 400;
    res.status(status).json({ message: err.message });
  }
};

const getAllDevices = async (req, res) => {
  try {
    const devices = await deviceService.getAllDevices();
    res.status(200).json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerDevice,
  updateDevice,
  getAllDevices,
};
