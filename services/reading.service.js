const Reading = require('../models/Reading');

const addReading = async (data) => {
  const reading = new Reading({
    deviceId: data.deviceId,
    sim: data.sim,
    temperature: data.temperature,
    HotPlate1Temp: data.HotPlate1Temp,
    HotPlate2Temp: data.HotPlate2Temp,
    ShellTemp: data.ShellTemp,
    sensor: {
      Voltage: data.sensor?.Voltage,
      SignalStrength: data.sensor?.SignalStrength,
    },
  });
  return await reading.save();
};

const getRecentReadings = async (limit = 100) => {
  return await Reading.find().sort({ timestamp: -1 }).limit(limit);
};

module.exports = {
  addReading,
  getRecentReadings,
};
