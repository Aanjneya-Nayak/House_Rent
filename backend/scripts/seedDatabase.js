const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");
const Property = require("../models/Property");

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/houserent",
    );
    console.log("MongoDB connected for seeding");

    // Clear existing data
    await User.deleteMany({});
    await Property.deleteMany({});
    console.log("Cleared existing data");

    // Create sample users
    const users = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "password123",
        phone: "9876543210",
        role: "user",
        bio: "Experienced property owner with 5+ years in rental management",
        address: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
        },
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        password: "password123",
        phone: "9876543211",
        role: "user",
        bio: "Looking for comfortable rental properties",
        address: {
          street: "456 Oak Ave",
          city: "New York",
          state: "NY",
          zipCode: "10002",
        },
      },
      {
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        password: "admin123",
        phone: "1234567890",
        role: "admin",
        bio: "System administrator",
        address: {
          street: "789 Admin Ln",
          city: "New York",
          state: "NY",
          zipCode: "10003",
        },
      },
      {
        firstName: "Michael",
        lastName: "Johnson",
        email: "michael@example.com",
        password: "password123",
        phone: "9876543212",
        role: "user",
        bio: "Portfolio of luxury apartments",
        address: {
          street: "321 Luxury St",
          city: "Los Angeles",
          state: "CA",
          zipCode: "90001",
        },
      },
    ];

    const createdUsers = await User.create(users);
    console.log(`Created ${createdUsers.length} users`);

    // Create sample properties
    const properties = [
      {
        title: "Modern 2BHK in Manhattan",
        description:
          "Spacious and well-lit 2 bedroom apartment with stunning city views. Recently renovated kitchen and modern amenities.",
        owner: createdUsers[0]._id,
        price: 2500,
        location: {
          street: "100 5th Ave",
          city: "New York",
          state: "NY",
          zipCode: "10011",
        },
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1200,
        propertyType: "apartment",
        availableFrom: new Date("2026-03-01"),
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
        ],
        amenities: ["wifi", "gym", "parking", "air-conditioning", "furnished"],
        rating: 4.5,
        reviewCount: 12,
        status: "approved",
        createdAt: new Date("2025-12-15"),
      },
      {
        title: "Cozy Studio in Brooklyn",
        description:
          "Intimate studio apartment perfect for professionals. High ceiling, hardwood floors, and natural light throughout.",
        owner: createdUsers[0]._id,
        price: 1800,
        location: {
          street: "200 Atlantic Ave",
          city: "Brooklyn",
          state: "NY",
          zipCode: "11201",
        },
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 600,
        propertyType: "apartment",
        availableFrom: new Date("2026-03-10"),
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
        ],
        amenities: ["wifi", "parking", "laundry"],
        rating: 4.2,
        reviewCount: 8,
        status: "approved",
        createdAt: new Date("2025-11-20"),
      },
      {
        title: "Luxury 3BHK in Manhattan",
        description:
          "Premium 3 bedroom villa with private balcony, marble flooring, and top-notch security.",
        owner: createdUsers[3]._id,
        price: 4500,
        location: {
          street: "500 Park Ave",
          city: "New York",
          state: "NY",
          zipCode: "10022",
        },
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 2000,
        propertyType: "villa",
        availableFrom: new Date("2026-03-05"),
        images: [
          "https://images.unsplash.com/photo-1512917774080-9b274b3b313a?w=500",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
        ],
        amenities: [
          "wifi",
          "gym",
          "pool",
          "parking",
          "air-conditioning",
          "furnished",
          "security",
        ],
        rating: 4.8,
        reviewCount: 25,
        status: "approved",
        createdAt: new Date("2025-10-01"),
      },
      {
        title: "Beautiful House with Garden",
        description:
          "Charming 2 story house with backyard garden, perfect for families. Walking distance to schools.",
        owner: createdUsers[3]._id,
        price: 3200,
        location: {
          street: "789 Sunset Blvd",
          city: "Los Angeles",
          state: "CA",
          zipCode: "90028",
        },
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1800,
        propertyType: "house",
        availableFrom: new Date("2026-04-01"),
        images: [
          "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=500",
        ],
        amenities: ["wifi", "parking", "garden", "furnished"],
        rating: 4.6,
        reviewCount: 15,
        status: "approved",
        createdAt: new Date("2025-09-10"),
      },
      {
        title: "Trendy Condo in SoHo",
        description:
          "Modern condo with exposed brick walls, large windows, and open floor plan. Pet-friendly building.",
        owner: createdUsers[0]._id,
        price: 3000,
        location: {
          street: "150 Wooster St",
          city: "New York",
          state: "NY",
          zipCode: "10012",
        },
        bedrooms: 2,
        bathrooms: 1,
        squareFeet: 1400,
        propertyType: "condo",
        availableFrom: new Date("2026-03-15"),
        images: [
          "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=500",
        ],
        amenities: ["wifi", "parking", "pet-friendly", "air-conditioning"],
        rating: 4.4,
        reviewCount: 10,
        status: "approved",
        createdAt: new Date("2025-08-05"),
      },
      {
        title: "Spacious 2BHK with Balcony",
        description:
          "Well-maintained apartment with separate balcony overlooking the park. Central location with easy access to metro.",
        owner: createdUsers[0]._id,
        price: 2200,
        location: {
          street: "50 Central Park",
          city: "New York",
          state: "NY",
          zipCode: "10024",
        },
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1100,
        propertyType: "apartment",
        availableFrom: new Date("2026-03-20"),
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
        ],
        amenities: ["wifi", "gym", "parking", "furnished"],
        rating: 4.3,
        reviewCount: 9,
        status: "approved",
        createdAt: new Date("2025-07-12"),
      },
      {
        title: "New Listing - Premium Townhouse",
        description:
          "Recently listed premium townhouse awaiting admin approval. Modern finishes and great location.",
        owner: createdUsers[3]._id,
        price: 2800,
        location: {
          street: "80 Spring St",
          city: "New York",
          state: "NY",
          zipCode: "10012",
        },
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1300,
        propertyType: "townhouse",
        availableFrom: new Date("2026-04-15"),
        images: [
          "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500",
        ],
        amenities: ["wifi", "air-conditioning", "furnished"],
        rating: 0,
        reviewCount: 0,
        status: "pending",
        createdAt: new Date("2026-02-28"),
      },
    ];

    const createdProperties = await Property.create(properties);
    console.log(`Created ${createdProperties.length} properties`);

    console.log("\n✅ Database seeded successfully!");
    console.log("\nTest Accounts:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Admin Account:");
    console.log("  Email: admin@example.com");
    console.log("  Password: admin123");
    console.log("\nProperty Owner Account:");
    console.log("  Email: john@example.com");
    console.log("  Password: password123");
    console.log("\nTenant Account:");
    console.log("  Email: jane@example.com");
    console.log("  Password: password123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
