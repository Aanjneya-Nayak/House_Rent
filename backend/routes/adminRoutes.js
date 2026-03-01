const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const adminController = require("../controllers/adminController");

// Admin routes
router.get(
  "/properties/pending",
  authMiddleware,
  adminMiddleware,
  adminController.getPendingProperties,
);
router.put(
  "/properties/:id/approve",
  authMiddleware,
  adminMiddleware,
  adminController.approveProperty,
);
router.put(
  "/properties/:id/reject",
  authMiddleware,
  adminMiddleware,
  adminController.rejectProperty,
);
router.get(
  "/dashboard/stats",
  authMiddleware,
  adminMiddleware,
  adminController.getDashboardStats,
);
router.get(
  "/analytics/trends",
  authMiddleware,
  adminMiddleware,
  adminController.getPropertyTrends,
);

module.exports = router;
