
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

// Initialize Express FIRST
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json({ limit: "20kb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "NextGen Academy API is running",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);

// Server configuration
const PORT = process.env.PORT || 5000;

// Connect MongoDB and start server
async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
    console.log("Database:", mongoose.connection.name);

    app.listen(PORT, () => {
      console.log(`NextGen API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server error:", error.message);
    process.exit(1);
  }
}

startServer();
