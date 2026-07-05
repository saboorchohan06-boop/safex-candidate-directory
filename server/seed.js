// seed.js — Bulk import all candidates into MongoDB in one shot.
// Run with: node seed.js

require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const Candidate = require("./models/Candidate"); // adjust path to your model

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const data = JSON.parse(fs.readFileSync("./candidates_seed.json", "utf-8"));

    // Optional: wipe existing data before re-seeding (comment out if you don't want this)
    await Candidate.deleteMany({});

    const result = await Candidate.insertMany(data);
    console.log(`Inserted ${result.length} candidates successfully.`);

    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();