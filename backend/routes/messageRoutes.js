const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const messageController = require("../controllers/messageController");

// Protected routes
router.get(
  "/conversations",
  authMiddleware,
  messageController.getConversations,
);
router.get("/:otherUserId", authMiddleware, messageController.getMessages);
router.post("/", authMiddleware, messageController.sendMessage);

module.exports = router;
