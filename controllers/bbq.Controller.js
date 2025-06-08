const {
  getAllBBQs,
  createBBQ,
  getBBQById,
  updateBBQ,
  deleteBBQ,
  insertBulkBBQs
} = require('../services/bbq.service');

const getBBQs = async (req, res) => {
  try {
    const bbqs = await getAllBBQs();
    res.status(200).json({ bbqs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createNew = async (req, res) => {
  try {
    const { name, longitude, latitude } = req.body;
    const newBBQ = await createBBQ(name, longitude, latitude);
    res.status(201).json({ newBBQ });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const bbq = await getBBQById(req.params.id);
    if (!bbq) return res.status(404).json({ error: "BBQ not found" });
    res.status(200).json(bbq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateById = async (req, res) => {
  try {
    const updated = await updateBBQ(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "BBQ not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const deleted = await deleteBBQ(req.params.id);
    if (!deleted) return res.status(404).json({ error: "BBQ not found" });
    res.status(200).json({ message: "BBQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const bulkInsertBBQs = async (req, res) => {
  try {
    const bbqList = req.body;

    if (!Array.isArray(bbqList) || bbqList.length === 0) {
      return res.status(400).json({ message: "Invalid or empty BBQ data" });
    }

    const insertedCount = await insertBulkBBQs(bbqList);

    return res.status(200).json({ message: `${insertedCount} BBQs inserted successfully.` });
  } catch (error) {
    console.error("Controller error:", error.message);
    return res.status(500).json({ message: "Error inserting BBQs", error: error.message });
  }
};


module.exports = {
  getBBQs,
  createNew,
  getById,
  updateById,
  deleteById,
  bulkInsertBBQs
};
