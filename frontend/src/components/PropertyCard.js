import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaBed, FaBath, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import "../styles/PropertyCard.css";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/property/${property._id}`);
  };

  return (
    <Card className="property-card h-100">
      <div className="property-image">
        <img
          src={property.images?.[0] || "https://via.placeholder.com/300x200"}
          alt={property.title}
          className="card-img-top"
        />
        <Badge bg="success" className="price-badge">
          ${property.price}/month
        </Badge>
      </div>

      <Card.Body>
        <Card.Title className="property-title">{property.title}</Card.Title>

        <div className="property-location mb-2">
          <FaMapMarkerAlt className="me-1 text-primary" />
          <small className="text-muted">
            {property.location?.city}, {property.location?.state}
          </small>
        </div>

        <div className="property-details mb-3">
          <div className="detail-item">
            <FaBed className="me-1" />
            <span>{property.bedrooms} Bed</span>
          </div>
          <div className="detail-item">
            <FaBath className="me-1" />
            <span>{property.bathrooms} Bath</span>
          </div>
          <div className="detail-item">
            <span>{property.squareFeet} sqft</span>
          </div>
        </div>

        <div className="property-rating mb-3">
          <FaStar className="text-warning me-1" />
          <span className="me-2">{property.rating || 0}</span>
          <small className="text-muted">({property.reviewCount} reviews)</small>
        </div>

        <div className="property-type">
          <Badge bg="info" className="me-2">
            {property.propertyType}
          </Badge>
        </div>

        <Button
          variant="primary"
          className="w-100 mt-3"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
