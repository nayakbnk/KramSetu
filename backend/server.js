
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const departmentRoutes = require("./routes/departmentRoutes");
require("dotenv").config();
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/departments", departmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to KramSetu Backend!",
    status: "Server is running",
  });
});

app.get("/health", (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(databaseConnected ? 200 : 503).json({
    app: "KramSetu",
    server: "running",
    database: databaseConnected ? "connected" : "disconnected",
  });
});

// Connect to MongoDB, then start the server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`KramSetu backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
