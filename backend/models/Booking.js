const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },
  bookingStatus: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending",
  },
  specialRequests: String,
  renterMessage: String,
  ownerResponse: String,
  rating: {
    propertyRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    ownerRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for queries
bookingSchema.index({ property: 1, renter: 1 });
bookingSchema.index({ owner: 1 });
bookingSchema.index({ bookingStatus: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
