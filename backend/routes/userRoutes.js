const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const userController = require("../controllers/userController");

// Protected routes
router.get("/:userId", userController.getUserProfile);
router.put("/profile/update", authMiddleware, userController.updateUserProfile);

// Admin routes
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);
router.put(
  "/:userId/role",
  authMiddleware,
  adminMiddleware,
  userController.updateUserRole,
);
router.put(
  "/:userId/status",
  authMiddleware,
  adminMiddleware,
  userController.toggleUserStatus,
);

module.exports = router;
