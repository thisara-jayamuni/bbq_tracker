const BBQ = require("../models/BBQ.js");

const getAllBBQs = async () => {
  const bbqs = await BBQ.find();
  return bbqs.map(bbq => ({
    id: bbq._id,
    lat: bbq.location.coordinates[1],
    lng: bbq.location.coordinates[0],
    name: bbq.name,
    cleanliness: bbq.cleanliness,
    lastCleaned: bbq.lastCleaned,
    status: bbq.status,
  }));
};

const createBBQ = async (name, longitude, latitude, options = {}) => {
  if (!latitude || !longitude || !name) {
    throw new Error("Missing required fields");
  }

  const {
    cleanliness = 'Clean',
    status = 'Working',
    lastCleaned = new Date()
  } = options;

  const newBBQ = new BBQ({
    name,
    location: {
      type: 'Point',
      coordinates: [longitude, latitude]
    },
    cleanliness,
    status,
    lastCleaned
  });

  return await newBBQ.save();
};

const getBBQById = async (id) => {
  const bbq = await BBQ.findById(id);
  if (!bbq) return null;

  return {
    id: bbq._id,
    lat: bbq.location.coordinates[1],
    lng: bbq.location.coordinates[0],
    name: bbq.name,
    cleanliness: bbq.cleanliness,
    lastCleaned: bbq.lastCleaned,
    lastUpdate: bbq.lastUpdate,
    status: bbq.status,
  };
};

const updateBBQ = async (id, updateData) => {
  const updated = await BBQ.findByIdAndUpdate(id, updateData, { new: true });
  return updated;
};

const deleteBBQ = async (id) => {
  return await BBQ.findByIdAndDelete(id);
};

const insertBulkBBQs = async (bbqList) => {
  const formattedBBQs = bbqList.map(bbq => ({
    name: bbq.name,
    location: {
      type: "Point",
      coordinates: bbq.location.coordinates,
    },
    cleanliness: bbq.cleanliness || "Clean",
    status: bbq.status || "Working",
    lastCleaned: bbq.lastCleaned ? new Date(bbq.lastCleaned) : new Date(),
    lastUpdate: bbq.lastUpdate ? new Date(bbq.lastUpdate) : new Date(),
    createdAt: bbq.createdAt ? new Date(bbq.createdAt) : new Date(),
  }));

  const result = await BBQ.insertMany(formattedBBQs, { ordered: false });
  return result.length;
};


module.exports = {
  createBBQ,
  getAllBBQs,
  getBBQById,
  updateBBQ,
  deleteBBQ,
  insertBulkBBQs
};
