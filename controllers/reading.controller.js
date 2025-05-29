const Reading = require('../models/Reading');

const addReading = async (req, res) => {
  try {
    const reading = new Reading(req.body);
    await reading.save();
    console.log("Reading added:", reading);
    res.status(200).json("ok");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  addReading
};