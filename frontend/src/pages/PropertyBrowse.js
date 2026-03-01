import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { propertyService } from "../services/api";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import PropertyCard from "../components/PropertyCard";
import "../styles/PropertyBrowse.css";

const PropertyBrowse = () => {
  const { isAuthenticated } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (searchFilters = filters) => {
    try {
      setLoading(true);
      const res = await propertyService.getProperties(searchFilters);
      setProperties(res.data.properties);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties(filters);
  };

  const handleReset = () => {
    setFilters({
      city: "",
      minPrice: "",
      maxPrice: "",
      type: "",
      bedrooms: "",
      bathrooms: "",
    });
    fetchProperties({});
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Browse Properties</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-4">
        <Col md={3}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSearch}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="City"
                    value={filters.city}
                    onChange={handleFilterChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Property Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="villa">Villa</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Min Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="minPrice"
                    placeholder="Min price"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Max Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxPrice"
                    placeholder="Max price"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Bedrooms</Form.Label>
                  <Form.Control
                    type="number"
                    name="bedrooms"
                    placeholder="Bedrooms"
                    value={filters.bedrooms}
                    onChange={handleFilterChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Bathrooms</Form.Label>
                  <Form.Control
                    type="number"
                    name="bathrooms"
                    placeholder="Bathrooms"
                    value={filters.bathrooms}
                    onChange={handleFilterChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-2">
                  Search
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleReset}
                  className="w-100"
                >
                  Reset
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : properties.length > 0 ? (
            <Row>
              {properties.map((property) => (
                <Col md={6} lg={4} key={property._id} className="mb-4">
                  <PropertyCard property={property} />
                </Col>
              ))}
            </Row>
          ) : (
            <Alert variant="info">
              No properties found. Try adjusting your filters.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyBrowse;
