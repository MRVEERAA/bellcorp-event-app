const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const registrationRoutes = require("./src/routes/registrationRoutes");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

// Default API route
app.get("/api", (req, res) => {
  res.json({ message: "API running..." });
});

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // ✅ Correct catch-all
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}

// 404 Handler
app.use((req, res) => res.status(404).json({ message: "Route Not Found" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
