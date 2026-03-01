const Property = require("../models/Property");
const User = require("../models/User");
const Booking = require("../models/Booking");

// Get pending properties
const getPendingProperties = async (req, res) => {
  try {
    const properties = await Property.find({ status: "pending" }).populate(
      "owner",
      "firstName lastName email phone",
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

// Approve property
const approveProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    let property = await Property.findByIdAndUpdate(
      id,
      {
        status: "approved",
        approvedBy: req.user.userId,
      },
      { new: true },
    ).populate("owner", "firstName lastName email");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property approved successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reject property
const rejectProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    let property = await Property.findByIdAndUpdate(
      id,
      {
        status: "rejected",
      },
      { new: true },
    ).populate("owner", "firstName lastName email");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property rejected successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProperties = await Property.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const pendingProperties = await Property.countDocuments({
      status: "pending",
    });
    const approvedProperties = await Property.countDocuments({
      status: "approved",
    });

    const bookingsByStatus = await Booking.aggregate([
      {
        $group: {
          _id: "$bookingStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProperties,
        totalBookings,
        pendingProperties,
        approvedProperties,
        bookingsByStatus: bookingsByStatus.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get property trends
const getPropertyTrends = async (req, res) => {
  try {
    const { city } = req.query;

    let filter = {};
    if (city) {
      filter["location.city"] = { $regex: city, $options: "i" };
    }

    const avgPrice = await Property.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$location.city",
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      trends: avgPrice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPendingProperties,
  approveProperty,
  rejectProperty,
  getDashboardStats,
  getPropertyTrends,
};
