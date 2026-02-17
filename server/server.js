const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Routes
const authRoutes = require("./src/routes/authRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const registrationRoutes = require("./src/routes/registrationRoutes");

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// CORS: local + deployed frontend
// =======================
const allowedOrigins = [
  "http://localhost:5173",
  "https://bellcorp-event-app-tau.vercel.app",
  "https://bellcorp-event-app-backend.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman or server-to-server
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ CORS Not Allowed: " + origin));
      }
    },
    credentials: true,
  }),
);

// =======================
// Routes
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

app.get("/api", (req, res) => res.json({ message: "API running" }));

// =======================
// MongoDB connection + server start
// =======================
const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not defined in environment");
    }

    await mongoose.connect(process.env.MONGO_URI); // ✅ latest mongoose doesn't need options
    console.log("📌 MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Server Error:", err);
  }
};

startServer();
