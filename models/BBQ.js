const mongoose = require("mongoose");

const bbqSchema = new mongoose.Schema({
  locationName: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  status: {
    type: String,
    enum: ["clean", "dirty", "out_of_order"],
    default: "clean"
  },
  lastCleaned: Date,
  notes: String
});

module.exports = mongoose.model("BBQ", bbqSchema);
