const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getChatHistory,
} = require("../controllers/chatController");

router.post("/", sendMessage);
router.get("/:userId", getChatHistory);

module.exports = router;
