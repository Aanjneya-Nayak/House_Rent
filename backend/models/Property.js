const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a property title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  propertyType: {
    type: String,
    enum: ["apartment", "house", "condo", "townhouse", "villa"],
    required: true,
  },
  location: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: String,
    country: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  price: {
    type: Number,
    required: [true, "Please provide rent price"],
  },
  currency: {
    type: String,
    default: "USD",
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0,
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0,
  },
  squareFeet: {
    type: Number,
    required: true,
  },
  amenities: [
    {
      type: String,
      enum: [
        "wifi",
        "parking",
        "pool",
        "gym",
        "balcony",
        "garden",
        "air-conditioning",
        "heating",
        "furnished",
        "pet-friendly",
        "laundry",
        "security",
      ],
    },
  ],
  images: [
    {
      type: String,
    },
  ],
  availableFrom: {
    type: Date,
    required: true,
  },
  leaseTermMonths: {
    type: Number,
    default: 12,
  },
  additionalRules: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "active", "inactive"],
    default: "pending",
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
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

// Index for search performance
propertySchema.index({ "location.city": 1, price: 1 });
propertySchema.index({ "location.city": 1, status: 1 });
propertySchema.index({ owner: 1 });
propertySchema.index({ status: 1 });

module.exports = mongoose.model("Property", propertySchema);
