const readingService = require('../services/reading.service');

const addReading = async (req, res) => {
  try {
    const reading = await readingService.addReading(req.body);
    console.log("Reading added:", reading);
    res.status(200).json("ok");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  addReading
};
