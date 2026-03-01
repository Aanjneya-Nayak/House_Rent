import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { propertyService, bookingService } from "../services/api";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Spinner,
  Badge,
} from "react-bootstrap";
import {
  FaBed,
  FaBath,
  FaMapMarkerAlt,
  FaStar,
  FaWifi,
  FaParking,
} from "react-icons/fa";
import "../styles/PropertyDetail.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const res = await propertyService.getProperty(id);
      setProperty(res.data.property);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load property");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingError("");
    setBookingSuccess("");

    if (!checkInDate || !checkOutDate) {
      setBookingError("Please select check-in and check-out dates");
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setBookingError("Check-out date must be after check-in date");
      return;
    }

    setBookingLoading(true);

    try {
      await bookingService.createBooking({
        propertyId: id,
        checkInDate,
        checkOutDate,
        numberOfGuests,
      });
      setBookingSuccess("Booking request sent successfully!");
      setCheckInDate("");
      setCheckOutDate("");
      setNumberOfGuests(1);
    } catch (err) {
      setBookingError(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
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

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!property) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Property not found</Alert>
      </Container>
    );
  }

  const amenityIcons = {
    wifi: <FaWifi />,
    parking: <FaParking />,
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col md={8}>
          <Card className="mb-4">
            <div className="property-images">
              <img
                src={
                  property.images?.[0] || "https://via.placeholder.com/800x400"
                }
                alt={property.title}
                className="img-fluid"
              />
            </div>

            <Card.Body>
              <h1 className="mb-3">{property.title}</h1>

              <div className="property-meta mb-4">
                <div className="meta-item">
                  <FaMapMarkerAlt className="me-2 text-primary" />
                  {property.location?.street}, {property.location?.city},{" "}
                  {property.location?.state}
                </div>
                <div className="meta-item">
                  <FaStar className="me-2 text-warning" />
                  {property.rating} ({property.reviewCount} reviews)
                </div>
              </div>

              <h3 className="mb-3">${property.price}/month</h3>

              <div className="property-specs mb-4">
                <div className="spec-item">
                  <FaBed /> {property.bedrooms} Bedrooms
                </div>
                <div className="spec-item">
                  <FaBath /> {property.bathrooms} Bathrooms
                </div>
                <div className="spec-item">{property.squareFeet} sqft</div>
                <div className="spec-item">Type: {property.propertyType}</div>
              </div>

              <h4 className="mb-3">Description</h4>
              <p>{property.description}</p>

              {property.amenities && property.amenities.length > 0 && (
                <>
                  <h4 className="mb-3">Amenities</h4>
                  <div className="amenities-list">
                    {property.amenities.map((amenity) => (
                      <Badge
                        key={amenity}
                        bg="light"
                        text="dark"
                        className="me-2 mb-2"
                      >
                        {amenityIcons[amenity] || "✓"} {amenity}
                      </Badge>
                    ))}
                  </div>
                </>
              )}

              {property.additionalRules && (
                <>
                  <h4 className="mt-4 mb-3">Rules & Regulations</h4>
                  <p>{property.additionalRules}</p>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="sticky-top" style={{ top: "20px" }}>
            <Card.Body>
              <h3 className="mb-4">Book This Property</h3>

              {bookingSuccess && (
                <Alert variant="success">{bookingSuccess}</Alert>
              )}
              {bookingError && <Alert variant="danger">{bookingError}</Alert>}

              <Form onSubmit={handleBooking}>
                <Form.Group className="mb-3">
                  <Form.Label>Check-in Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Check-out Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate || new Date().toISOString().split("T")[0]}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Number of Guests</Form.Label>
                  <Form.Control
                    type="number"
                    value={numberOfGuests}
                    onChange={(e) =>
                      setNumberOfGuests(parseInt(e.target.value))
                    }
                    min="1"
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? "Booking..." : "Request Booking"}
                </Button>
              </Form>

              <Card.Text className="text-muted small mt-3">
                Available from:{" "}
                {new Date(property.availableFrom).toLocaleDateString()}
              </Card.Text>

              <Card className="mt-3">
                <Card.Body>
                  <h5>Owner Information</h5>
                  <p className="mb-1">
                    <strong>
                      {property.owner?.firstName} {property.owner?.lastName}
                    </strong>
                  </p>
                  <p className="text-muted mb-1">{property.owner?.email}</p>
                  <p className="text-muted">{property.owner?.phone}</p>
                  <Button variant="outline-primary" className="w-100">
                    Contact Owner
                  </Button>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyDetail;
