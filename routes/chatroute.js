const express = require("express");
const router = express.Router();
const { sendMessage, getChatHistory } = require("../controllers/chatController");

// POST chat message
router.post("/", sendMessage);

// GET chat history by userId
router.get("/:userId", getChatHistory);

module.exports = router;
