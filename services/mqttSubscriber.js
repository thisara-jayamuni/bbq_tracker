const mqtt = require("mqtt");
const mongoose = require("mongoose");
const Reading = require("../models/Reading");
const Device = require("../models/Device");
const BBQ = require("../models/BBQ");

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  client.subscribe("bbq/status", (err) => {
    if (!err) {
      console.log("Subscribed to bbq/status");
    } else {
      console.error("Subscription error:", err.message);
    }
  });
});

client.on("message", async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());

    if (!data.deviceId) {
      console.warn("Missing deviceId, skipping...");
      return;
    }

    
    const reading = new Reading({
      deviceId: data.deviceId,
      sim: data.sim,
      temperature: data.temperature,
      HotPlate1Temp: data.HotPlate1Temp,
      HotPlate2Temp: data.HotPlate2Temp,
      ShellTemp: data.ShellTemp,
      timestamp: new Date(),
      sensor: {
        Voltage: data.sensor?.Voltage,
        SignalStrength: data.sensor?.SignalStrength
      }
    });

    await reading.save();
    console.log(`Saved reading for ${data.deviceId}`);

    
    const device = await Device.findOne({ deviceId: data.deviceId });

    if (!device || !device.bbqId) {
      console.warn(`Device not found or not linked to BBQ: ${data.deviceId}`);
      return;
    }

    const updatedBBQ = await BBQ.findByIdAndUpdate(
      device.bbqId,
      { lastUpdate: new Date() },
      { new: true }
    );

    if (updatedBBQ) {
      console.log(`Updated lastUpdate for BBQ "${updatedBBQ.name}" (${updatedBBQ._id})`);
    } else {
      console.log(`Failed to update BBQ for device ${data.deviceId}. No BBQ found with ID ${device.bbqId}`);
    }

  } catch (err) {
    console.error(" Error handling MQTT message:", err.message);
  }
});
