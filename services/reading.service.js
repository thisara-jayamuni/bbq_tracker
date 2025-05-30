const Reading = require('../models/Reading');

const addReading = async (data) => {
  const reading = new Reading(data);
  await reading.save();
  return reading;
};

module.exports = {
  addReading
};
