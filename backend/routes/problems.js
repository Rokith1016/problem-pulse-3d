const express = require("express");
const router = express.Router();
const multer = require("multer");
const Problem = require("../models/Problem");
const authMiddleware = require("../middleware/authMiddleware");

// 🔊 DEBUG CONFIRM
console.log("🚀 problems route file loaded");

// =======================
// MULTER CONFIG
// =======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// =======================
// POST PROBLEM
// =======================
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("🔥 POST /api/problems HIT");
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      const { title, description, latitude, longitude } = req.body;

      if (!title || !description || !latitude || !longitude) {
        return res.status(400).json({ message: "Missing fields" });
      }

      const problem = new Problem({
        title,
        description,
        latitude,
        longitude,
        image: req.file ? req.file.filename : null,
        user: req.user.id,
      });

      await problem.save();

      res.status(201).json({
        message: "Problem reported successfully",
        problem,
      });
    } catch (err) {
      console.error("❌ ERROR:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
