const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const propertyController = require("../controllers/propertyController");

// Public routes
router.get("/", propertyController.getProperties);

// User properties (more specific route before general :id route)
router.get("/user/:userId", propertyController.getUserProperties);

// Get single property
router.get("/:id", propertyController.getProperty);

// Protected routes
router.post("/", authMiddleware, propertyController.createProperty);
router.put("/:id", authMiddleware, propertyController.updateProperty);
router.delete("/:id", authMiddleware, propertyController.deleteProperty);

module.exports = router;
