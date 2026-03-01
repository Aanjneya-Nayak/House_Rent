import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <Container className="h-100">
          <Row className="h-100 align-items-center">
            <Col md={6}>
              <h1 className="hero-title">Find Your Perfect Rental Home</h1>
              <p className="hero-subtitle">
                Discover thousands of rental properties in your favorite
                locations
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/properties")}
                className="me-3"
              >
                Browse Properties
              </Button>
              <Button
                variant="outline-primary"
                size="lg"
                onClick={() => navigate("/login")}
              >
                Get Started
              </Button>
            </Col>
            <Col md={6} className="text-center">
              <img
                src="https://via.placeholder.com/500x400"
                alt="Hero"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <h2 className="text-center mb-5">Why Choose HouseRent?</h2>
          <Row>
            <Col md={4} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h4>Advanced Search</h4>
                <p>Find properties with our comprehensive filtering options</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h4>Direct Messaging</h4>
                <p>Chat directly with property owners for inquiries</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">✔️</div>
                <h4>Verified Listings</h4>
                <p>All properties are verified and approved by our team</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-5 bg-primary text-white">
        <Container>
          <Row>
            <Col md={6}>
              <h2>Ready to Find Your New Home?</h2>
              <p>Join thousands of satisfied renters and property owners</p>
              <Button
                variant="light"
                size="lg"
                onClick={() => navigate("/register")}
              >
                Register Now
              </Button>
            </Col>
            <Col md={6} className="text-center">
              <div className="stats">
                <div className="stat-item">
                  <h3>10K+</h3>
                  <p>Properties</p>
                </div>
                <div className="stat-item">
                  <h3>50K+</h3>
                  <p>Users</p>
                </div>
                <div className="stat-item">
                  <h3>5K+</h3>
                  <p>Bookings</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
