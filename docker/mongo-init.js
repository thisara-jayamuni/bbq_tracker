db = db.getSiblingDB("bbqtracker"); // Switch to target DB

// Insert BBQ stations
db.bbqs.insertMany([
  {
    locationName: "Central Park BBQ",
    latitude: -37.8136,
    longitude: 144.9631,
    status: "clean",
    lastCleaned: new Date(),
    notes: "Located near the children's playground"
  },
  {
    locationName: "Seaside Reserve BBQ",
    latitude: -37.9200,
    longitude: 145.3039,
    status: "dirty",
    lastCleaned: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    notes: "Covered BBQ with two hotplates"
  }
]);

// Insert Devices
db.devices.insertMany([
  {
    deviceId: "bbq-001",
    sim: "89442012345678901234",
    bbqId: null,
    registeredAt: new Date()
  },
  {
    deviceId: "bbq-002",
    sim: "89442056789012345678",
    bbqId: null,
    registeredAt: new Date()
  }
]);

// Insert sample Readings
db.readings.insertMany([
  {
    deviceId: "bbq-001",
    sim: "89442012345678901234",
    latitude: -37.8136,
    longitude: 144.9631,
    temperature: 130,
    HotPlate1Temp: 125,
    HotPlate2Temp: 127,
    ShellTemp: 128,
    sensor: {
      Voltage: 12.2,
      SignalStrength: -65
    },
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
    sensor: {
      Voltage: 11.9,
      SignalStrength: -70
    },
    timestamp: new Date()
  }
]);

// Insert status logs
db.statuslogs.insertMany([
  {
    bbqId: null,
    oldStatus: "clean",
    newStatus: "dirty",
    changedAt: new Date(Date.now() - 3600000), // 1 hour ago
    source: "cron"
  },
  {
    bbqId: null,
    oldStatus: "dirty",
    newStatus: "out_of_order",
    changedAt: new Date(Date.now() - 7200000), // 2 hours ago
    source: "manual"
  }
]);
