const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Load config based on environment
const config = require('./config/config');

const app = express();

app.use(express.static('public'));

app.use(cors());
app.use(express.json());

// Load routes
const userRoutes = require('./routes/users.routes');
const deviceRoutes = require('./routes/device.routes');
const bbqRoutes = require('./routes/BBQ.routes');
const faultRoutes = require('./routes/faultReport.routes');
const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/jobs.routes');
const readingRoutes = require('./routes/reading.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bbqs', bbqRoutes);
app.use('/api/faults', faultRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/devices', deviceRoutes); 
app.use('/api/read', readingRoutes);
// Connect to MongoDB
mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
  console.log("MongoDB connected");
  require("./services/mqttSubscriber"); 
}).catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('BBQ Tracker API is running');
});

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
});
