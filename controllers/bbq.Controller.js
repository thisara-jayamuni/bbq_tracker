const BBQ = require("../models/BBQ"); // Make sure this path is correct based on your project

const getAllBBQs = async (req, res) => {
  try {
    const bbqs = await BBQ.find(); // Optional: use dummy response if model not ready
    res.status(200).json(bbqs);    // Replace with: res.status(200).json({ message: 'All BBQs' }); if no model yet
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createBBQ = async (req, res) => {
  try {
    const { name, location, status, lastCleaned } = req.body;

    if (!name || !location?.lat || !location?.lng) {
      return res.status(400).json({ error: "Missing required BBQ fields" });
    }

    const newBBQ = new BBQ({
      name,
      location,
      status,
      lastCleaned
    });

    const saved = await newBBQ.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to create BBQ", detail: error.message });
  }
};

module.exports = {
  getAllBBQs,
  createBBQ
};
