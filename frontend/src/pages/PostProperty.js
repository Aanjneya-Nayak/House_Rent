import React, { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { propertyService } from "../services/api";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/PostProperty.css";

const PostProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "apartment",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    amenities: [],
    availableFrom: "",
    leaseTermMonths: 12,
    additionalRules: "",
    images: [""],
  });

  const amenitiesOptions = [
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
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((a) => a !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const propertyData = {
        ...formData,
        location: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        price: parseInt(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        squareFeet: parseInt(formData.squareFeet),
        leaseTermMonths: parseInt(formData.leaseTermMonths),
      };

      delete propertyData.street;
      delete propertyData.city;
      delete propertyData.state;
      delete propertyData.zipCode;

      const res = await propertyService.createProperty(propertyData);
      setSuccess(
        "Property posted successfully! Your listing is now live and visible to renters.",
      );

      // Wait a bit then navigate to dashboard
      setTimeout(() => {
        navigate("/dashboard", { state: { refresh: true } });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-property-container">
      <div className="property-form-wrapper">
        <div className="property-form-header">
          <h1>List Your Property</h1>
          <p>
            Complete the form below to showcase your property to thousands of
            renters
          </p>
        </div>

        <div className="property-form-body">
          {error && (
            <Alert variant="danger" className="alert-danger">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="alert-success">
              {success}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="property-form-section">
              <h5 className="form-section-title">Basic Information</h5>

              <Form.Group className="form-group">
                <Form.Label className="form-label">
                  Property Title <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="e.g., Cozy 2-bed Apartment in Downtown"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label className="form-label">
                  Description <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  placeholder="Describe your property in detail..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="form-row">
                <Form.Group className="form-group">
                  <Form.Label className="form-label">
                    Property Type <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                  >
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="villa">Villa</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label className="form-label">
                    Monthly Rent <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    placeholder="0"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
            </div>

            {/* Location */}
            <div className="property-form-section">
              <h5 className="form-section-title">Location Details</h5>

              <Form.Group className="form-group">
                <Form.Label className="form-label">
                  Street Address <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  placeholder="123 Main Street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="form-row triple">
                <Form.Group className="form-group">
                  <Form.Label className="form-label">
                    City <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label className="form-label">
                    State <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    placeholder="NY"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label className="form-label">Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="zipCode"
                    placeholder="10001"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>

            {/* Property Details */}
            <div className="property-form-section">
              <h5 className="form-section-title">Property Details</h5>

              <div className="form-row quad">
                <Form.Group className="form-group">
                  <Form.Label className="form-label">
                    Bedrooms <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="bedrooms"
                    placeholder="0"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label className="form-label">
                    Bathrooms <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="bathrooms"
                    placeholder="0"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label className="form-label">
                    Square Feet <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="squareFeet"
                    placeholder="0"
                    value={formData.squareFeet}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label className="form-label">
                    Lease Term (Months)
                  </Form.Label>
                  <Form.Select
                    name="leaseTermMonths"
                    value={formData.leaseTermMonths}
                    onChange={handleChange}
                  >
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                    <option value="24">24 Months</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <Form.Group className="form-group">
                <Form.Label className="form-label">
                  Available From <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="availableFrom"
                  value={formData.availableFrom}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            {/* Amenities */}
            <div className="property-form-section">
              <h5 className="form-section-title">Amenities & Features</h5>

              <div className="amenities-grid">
                {amenitiesOptions.map((amenity) => (
                  <Form.Check
                    key={amenity}
                    type="checkbox"
                    id={amenity}
                    label={amenity
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")}
                    name="amenities"
                    value={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onChange={handleChange}
                    className="form-check-input"
                  />
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="property-form-section">
              <h5 className="mb-3 mt-4">Lease Terms</h5>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Available From</Form.Label>
                    <Form.Control
                      type="date"
                      name="availableFrom"
                      value={formData.availableFrom}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Lease Term (Months)</Form.Label>
                    <Form.Control
                      type="number"
                      name="leaseTermMonths"
                      placeholder="12"
                      value={formData.leaseTermMonths}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Rules */}
              <Form.Group className="form-group">
                <Form.Label className="form-label">
                  Additional Rules & Regulations
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="additionalRules"
                  placeholder="e.g., No smoking, No pets, Quiet hours after 10 PM"
                  value={formData.additionalRules}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            {/* Images */}
            <div className="property-form-section">
              <h5 className="mb-3 mt-4">Property Images</h5>
              <Form.Group className="form-group">
                <Form.Label className="form-label">
                  Image URL{" "}
                  <span className="text-muted">(paste image URLs)</span>
                </Form.Label>
                <Form.Control
                  type="url"
                  placeholder="e.g., https://images.unsplash.com/photo-example"
                  value={formData.images[0] || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      images: [e.target.value],
                    }))
                  }
                  className="mb-2"
                />
                <small className="text-muted d-block">
                  Paste a direct image URL. You can use free image services like
                  Unsplash, Pexels, or Pixabay.
                </small>
                {formData.images[0] && (
                  <div className="mt-3">
                    <img
                      src={formData.images[0]}
                      alt="Preview"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                      }}
                    />
                  </div>
                )}
              </Form.Group>
            </div>

            <div className="form-actions">
              <Button
                variant="primary"
                type="submit"
                className="btn-form btn-primary"
                disabled={loading}
              >
                {loading ? "Posting..." : "Post Property"}
              </Button>
              <Button
                variant="secondary"
                className="btn-form btn-secondary"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
            </div>

            {success && (
              <Alert variant="success" className="alert-success mt-3">
                <strong>Success!</strong> Your property has been listed and is
                pending admin review.
              </Alert>
            )}

            <Alert
              variant="info"
              className="mt-3"
              style={{
                borderLeft: "4px solid #4a90e2",
                background: "rgba(74, 144, 226, 0.1)",
              }}
            >
              <strong>Note:</strong> Your property will be reviewed by our admin
              team before becoming visible to users.
            </Alert>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PostProperty;
