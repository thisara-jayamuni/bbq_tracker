const BBQ = require("../models/BBQ"); 

const getAllBBQs = async (req, res) => {
  try {
    const bbqs = await BBQ.find(); 
    const formattedBBQs = bbqs.map(bbq => ({
      lat: bbq.location.coordinates[1],            // Adjust field names if needed
      lng: bbq.location.coordinates[0],
      name: bbq.name,
      cleanliness: bbq.status,
      lastCleaned: bbq.lastCleaned,
      status: bbq.status,
    }));
    res.status(200).json(formattedBBQs);   
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createBBQ = async (req, res) => {
  try {
    const { name, location, status, lastCleaned } = req.body;

    if (
      !location ||
      location.type !== 'Point' ||
      !Array.isArray(location.coordinates) ||
      location.coordinates.length !== 2
    ) {
      return res.status(400).json({ error: "Invalid or missing GeoJSON location data" });
    }

    const newBBQ = new BBQ({
      name,
      location,
      status,
      lastCleaned,
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBBQ = async (req, res) => {
  try {
    const updated = await BBQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "BBQ not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBBQ = async (req, res) => {
  try {
    const deleted = await BBQ.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "BBQ not found" });
    res.status(200).json({ message: "BBQ deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  createBBQ,
  getAllBBQs,
  getBBQById,
  updateBBQ,
  deleteBBQ
};
