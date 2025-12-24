const express = require("express");
const router = express.Router();

// Simple chatbot logic
router.post("/", (req, res) => {
  const { message } = req.body;

  let reply = "I didn’t understand. Please try again.";

  if (!message) {
    reply = "Please type something 🙂";
  } else if (message.toLowerCase().includes("hello")) {
    reply = "Hello 👋 How can I help you?";
  } else if (message.toLowerCase().includes("report")) {
    reply = "You can report problems using the Report Problem page.";
  } else if (message.toLowerCase().includes("map")) {
    reply = "The map shows reported problems in 3D.";
  }

  res.json({ reply });
});

module.exports = router;
