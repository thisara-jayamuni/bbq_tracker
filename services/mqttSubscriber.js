const mqtt = require("mqtt");
const mongoose = require("mongoose");
const Reading = require("../models/Reading");

// Connect to MQTT broker
const client = mqtt.connect("mqtt://localhost:1883"); // replace with your broker address

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  // Subscribe to topic
  client.subscribe("bbq/status", (err) => {
    if (!err) {
      console.log("Subscribed to bbq/status");
    } else {
      console.error("Subscription error:", err.message);
    }
  });
});

// Handle received MQTT messages
client.on("message", async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());

    // Optional: Validate required fields before saving
    if (!data.deviceId) {
      console.warn("Missing deviceId, skipping...");
      return;
    }

    // Save to MongoDB
    const reading = new Reading({
      deviceId: data.deviceId,
      sim: data.sim,
      temperature: data.temperature,
      HotPlate1Temp: data.HotPlate1Temp,
      HotPlate2Temp: data.HotPlate2Temp,
      ShellTemp: data.ShellTemp,
      sensor: {
        Voltage: data.sensor?.Voltage,
        SignalStrength: data.sensor?.SignalStrength
      }
    });

    await reading.save();
    // console.log("Reading saved for device:", data.deviceId);
  } catch (err) {
    console.error("Error handling MQTT message:", err.message);
  }
});
