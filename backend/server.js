const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Load environment variables
dotenv.config();

// Import database config
const connectDB = require("./config/database");

// Import routes
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const messageRoutes = require("./routes/messageRoutes");

// Import middleware
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  }),
);

// Serve static files from frontend build (for unified deployment)
const frontendBuildPath = path.join(__dirname, "./public");
// Create public directory if it doesn't exist
if (!fs.existsSync(frontendBuildPath)) {
  fs.mkdirSync(frontendBuildPath, { recursive: true });
}
app.use(express.static(frontendBuildPath));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/messages", messageRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

// Serve React app for all non-API routes (React Router support)
const indexPath = path.join(frontendBuildPath, "index.html");
app.get("*", (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).json({
      success: true,
      message: "Backend API is running. Frontend will be available once built.",
    });
  }
});

// 404 handler (fallback)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend build path: ${frontendBuildPath}`);
  console.log(`Frontend exists: ${fs.existsSync(indexPath)}`);
});

module.exports = app;
