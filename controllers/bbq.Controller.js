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

const getBBQById = async (req, res) => {
  try {
    const bbq = await BBQ.findById(req.params.id);
    if (!bbq) return res.status(404).json({ error: "BBQ not found" });
    res.status(200).json(bbq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBBQ = async (req, res) => {
  try {
    const updated = await BBQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "BBQ not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBBQ = async (req, res) => {
  try {
    const deleted = await BBQ.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "BBQ not found" });
    res.status(200).json({ message: "BBQ deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBBQs,
  createBBQ,
  getBBQById,
  updateBBQ,
  deleteBBQ
};
