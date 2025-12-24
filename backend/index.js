const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(cors());
app.use(express.json());

// ✅ SERVE UPLOADED IMAGES
app.use("/uploads", express.static("uploads"));

/* ======================
   ROUTES
====================== */

// Auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Problem routes (IMPORTANT 🔥)
const problemRoutes = require("./routes/problems");
app.use("/api/problems", problemRoutes);

// Auth middleware
const authMiddleware = require("./middleware/authMiddleware");

/* ======================
   TEST ROUTES
====================== */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed ✅",
    user: req.user,
  });
});

/* ======================
   DATABASE
====================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB error:", err));

/* ======================
   SERVER
====================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const chatbotRoutes = require("./routes/chatbot");
app.use("/api/chatbot", chatbotRoutes);
