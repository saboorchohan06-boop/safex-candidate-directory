const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    university: {
      type: String,
      required: true,
      trim: true,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
    },

    field: {
      type: String,
      required: true,
      trim: true,
    },

    group: {
      type: Number,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["Leader", "Member"],
      default: "Member",
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    taskStatus: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Candidate", candidateSchema);