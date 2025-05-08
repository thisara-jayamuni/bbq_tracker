const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Load config based on environment
const config = require("./config/config");

const app = express();
app.use(cors());
app.use(express.json());

// Load routes
const userRoutes = require("./routes/users.routes");
// Add more as needed
app.use("/api/users", userRoutes);

// Connect to MongoDB
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("🔥 BBQ Tracker API is running");
});

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
});
