const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    latitude: Number,
    longitude: Number,
    image: String,
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);
