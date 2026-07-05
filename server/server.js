const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const candidateRoutes = require("./routes/candidateRoutes");

const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/candidates", candidateRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("SafeX Candidate Directory API is running...");
});

// Set Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
