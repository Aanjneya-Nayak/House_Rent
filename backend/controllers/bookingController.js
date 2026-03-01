const Booking = require("../models/Booking");
const Property = require("../models/Property");

// Get all bookings (admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("property", "title price location")
      .populate("renter", "firstName lastName email")
      .populate("owner", "firstName lastName email");

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user bookings
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookings = await Booking.find({
      $or: [{ renter: userId }, { owner: userId }],
    })
      .populate("property", "title price location images")
      .populate("renter", "firstName lastName email phone")
      .populate("owner", "firstName lastName email phone");

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single booking
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("property")
      .populate("renter", "firstName lastName email phone")
      .populate("owner", "firstName lastName email phone");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create booking
const createBooking = async (req, res) => {
  try {
    const {
      propertyId,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      specialRequests,
    } = req.body;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Calculate number of nights
    const checkInTime = new Date(checkInDate);
    const checkOutTime = new Date(checkOutDate);
    const nights = Math.ceil(
      (checkOutTime - checkInTime) / (1000 * 60 * 60 * 24),
    );

    if (nights <= 0) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    const totalPrice = property.price * nights;

    const booking = new Booking({
      property: propertyId,
      renter: req.user.userId,
      owner: property.owner,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      totalPrice,
      specialRequests,
    });

    await booking.save();
    await booking.populate("property");
    await booking.populate("renter", "firstName lastName email");
    await booking.populate("owner", "firstName lastName email");

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;

    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check authorization
    if (
      booking.owner.toString() !== req.user.userId &&
      booking.renter.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this booking",
      });
    }

    if (bookingStatus) {
      booking.bookingStatus = bookingStatus;
    }

    if (paymentStatus) {
      booking.paymentStatus = paymentStatus;
    }

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check authorization
    if (
      booking.renter.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this booking",
      });
    }

    booking.bookingStatus = "cancelled";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add review and rating
const addReview = async (req, res) => {
  try {
    const { propertyRating, ownerRating, review } = req.body;

    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.bookingStatus !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Can only review completed bookings",
      });
    }

    booking.rating = {
      propertyRating,
      ownerRating,
      review,
    };

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Review added successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllBookings,
  getUserBookings,
  getBooking,
  createBooking,
  updateBookingStatus,
  cancelBooking,
  addReview,
};
