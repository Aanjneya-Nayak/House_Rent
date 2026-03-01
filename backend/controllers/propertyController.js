const Property = require("../models/Property");
const User = require("../models/User");

// Get all properties with search and filters
const getProperties = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, type, bedrooms, bathrooms, amenities } =
      req.query;
    let filter = { status: "approved" };

    if (city) {
      filter["location.city"] = { $regex: city, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    if (type) {
      filter.propertyType = type;
    }

    if (bedrooms) {
      filter.bedrooms = parseInt(bedrooms);
    }

    if (bathrooms) {
      filter.bathrooms = parseInt(bathrooms);
    }

    if (amenities) {
      const amenityList = Array.isArray(amenities) ? amenities : [amenities];
      filter.amenities = { $in: amenityList };
    }

    const properties = await Property.find(filter)
      .populate("owner", "firstName lastName email phone profileImage")
      .limit(50);

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single property
const getProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true },
    )
      .populate("owner", "firstName lastName email phone profileImage bio")
      .populate("approvedBy", "firstName lastName email");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create property
const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      propertyType,
      location,
      price,
      bedrooms,
      bathrooms,
      squareFeet,
      amenities,
      availableFrom,
      leaseTermMonths,
      additionalRules,
    } = req.body;

    const property = new Property({
      title,
      description,
      owner: req.user.userId,
      propertyType,
      location,
      price,
      bedrooms,
      bathrooms,
      squareFeet,
      amenities: Array.isArray(amenities) ? amenities : [amenities],
      availableFrom,
      leaseTermMonths,
      additionalRules,
      status: "approved", // Auto-approve for now - user can see posted properties immediately
    });

    await property.save();
    await property.populate("owner", "firstName lastName email phone");

    res.status(201).json({
      success: true,
      message: "Property posted successfully and is now visible!",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update property
const updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check if user is owner or admin
    if (
      property.owner.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this property",
      });
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("owner", "firstName lastName email");

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check if user is owner or admin
    if (
      property.owner.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this property",
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user properties
const getUserProperties = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.userId;
    const properties = await Property.find({ owner: userId }).populate(
      "owner",
      "firstName lastName email",
    );

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getUserProperties,
};
