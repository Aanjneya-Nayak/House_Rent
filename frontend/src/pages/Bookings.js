import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { bookingService } from "../services/api";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import "../styles/Bookings.css";

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await bookingService.getUserBookings();
      setBookings(res.data.bookings);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await bookingService.cancelBooking(bookingId);
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, bookingStatus: "cancelled" } : b,
          ),
        );
      } catch (err) {
        alert(err.response?.data?.message || "Failed to cancel booking");
      }
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.bookingStatus === filter;
  });

  const getStatusBadge = (status) => {
    const variants = {
      pending: "warning",
      confirmed: "success",
      cancelled: "danger",
      completed: "info",
    };
    return variants[status] || "secondary";
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">My Bookings</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="filter-buttons mb-4">
        {["all", "pending", "confirmed", "completed", "cancelled"].map(
          (status) => (
            <Button
              key={status}
              variant={filter === status ? "primary" : "outline-primary"}
              onClick={() => setFilter(status)}
              className="me-2"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ),
        )}
      </div>

      {filteredBookings.length > 0 ? (
        <Row>
          {filteredBookings.map((booking) => (
            <Col lg={6} key={booking._id} className="mb-4">
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="card-title">{booking.property?.title}</h5>
                      <small className="text-muted">
                        {booking.property?.location?.city}
                      </small>
                    </div>
                    <Badge bg={getStatusBadge(booking.bookingStatus)}>
                      {booking.bookingStatus}
                    </Badge>
                  </div>

                  <div className="booking-details mb-3">
                    <p className="mb-2">
                      <strong>Check-in:</strong>{" "}
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </p>
                    <p className="mb-2">
                      <strong>Check-out:</strong>{" "}
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </p>
                    <p className="mb-2">
                      <strong>Guests:</strong> {booking.numberOfGuests}
                    </p>
                    <p className="mb-0">
                      <strong>Total Price:</strong> ${booking.totalPrice}
                    </p>
                  </div>

                  <div className="booking-actions">
                    {booking.bookingStatus === "pending" && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleCancelBooking(booking._id)}
                      >
                        Cancel Booking
                      </Button>
                    )}
                    {booking.bookingStatus === "completed" &&
                      !booking.rating && (
                        <Button variant="primary" size="sm">
                          Leave Review
                        </Button>
                      )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">No bookings found</Alert>
      )}
    </Container>
  );
};

export default Bookings;
