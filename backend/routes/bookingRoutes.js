const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const bookingController = require("../controllers/bookingController");

// Admin routes (must come first before user routes)
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  bookingController.getAllBookings,
);

// Protected routes - specific routes before generic :id route
router.post("/", authMiddleware, bookingController.createBooking);
router.get("/user-bookings", authMiddleware, bookingController.getUserBookings);

// Generic routes for single booking operations
router.get("/:id", authMiddleware, bookingController.getBooking);
router.put(
  "/:id/status",
  authMiddleware,
  bookingController.updateBookingStatus,
);
router.put("/:id/cancel", authMiddleware, bookingController.cancelBooking);
router.post("/:id/review", authMiddleware, bookingController.addReview);

module.exports = router;
