const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const authController = require("../controllers/authController");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes
router.get("/logout", authMiddleware, authController.logout);
router.get("/current-user", authMiddleware, authController.getCurrentUser);

module.exports = router;
