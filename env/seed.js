const mongoose = require("mongoose");
const config = require("../config/config"); // Adjust path as needed

// Import models
const BBQ = require("./models/BBQ");
const Device = require("./models/Device");
const Reading = require("./models/Reading");
const StatusLog = require("./models/StatusLog");
const User = require("./models/User"); 

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(config.mongoUri);

    console.log("Connected. Clearing old data...");
    await Promise.all([
      BBQ.deleteMany({}),
      Device.deleteMany({}),
      Reading.deleteMany({}),
      StatusLog.deleteMany({}),
      User.deleteMany({})
    ]);

    console.log("Seeding collections...");

    const bbqs = await BBQ.insertMany([
      {
        locationName: "Central Park BBQ",
        latitude: -37.8136,
        longitude: 144.9631,
        status: "clean",
        lastCleaned: new Date(),
        notes: "Located near playground"
      },
      {
        locationName: "Seaside BBQ",
        latitude: -37.9200,
        longitude: 145.3039,
        status: "dirty",
        lastCleaned: new Date(Date.now() - 2 * 86400000), // 2 days ago
        notes: "Shaded area"
      }
    ]);

    const devices = await Device.insertMany([
      {
        deviceId: "bbq-001",
        sim: "89442012345678901234",
        bbqId: bbqs[0]._id
      },
      {
        deviceId: "bbq-002",
        sim: "89442056789012345678",
        bbqId: bbqs[1]._id
      }
    ]);

    await Reading.insertMany([
      {
        deviceId: "bbq-001",
        sim: "89442012345678901234",
        latitude: -37.8136,
        longitude: 144.9631,
        temperature: 130,
        HotPlate1Temp: 125,
        HotPlate2Temp: 127,
        ShellTemp: 128,
        sensor: { Voltage: 12.2, SignalStrength: -65 },
        timestamp: new Date()
      },
      {
        deviceId: "bbq-002",
        sim: "89442056789012345678",
        latitude: -37.9200,
        longitude: 145.3039,
        temperature: 85,
        HotPlate1Temp: 80,
        HotPlate2Temp: 90,
        ShellTemp: 84,
        sensor: { Voltage: 11.9, SignalStrength: -70 },
        timestamp: new Date()
      }
    ]);

    await StatusLog.insertMany([
      {
        bbqId: bbqs[0]._id,
        oldStatus: "clean",
        newStatus: "dirty",
        source: "cron"
      },
      {
        bbqId: bbqs[1]._id,
        oldStatus: "dirty",
        newStatus: "out_of_order",
        source: "manual"
      }
    ]);

        await User.create([
      {
        email: "admin@example.com",
        password: "Admin123!", 
        role: "admin"
      },
      {
        email: "cleaner@example.com",
        password: "Cleaner123!",
        role: "cleaner"
      },
      {
        email: "user@example.com",
        password: "User123!",
        role: "user"
      }
    ]);

    console.log("Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();
