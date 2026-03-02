import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Badge,
  Alert,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { propertyService } from "../services/api";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userProperties, setUserProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(true);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!isAdmin && user?._id) {
      fetchUserProperties();
    }
  }, [location.pathname, isAdmin, user?._id]);

  // Refresh properties when returning to dashboard
  useEffect(() => {
    const handleFocus = () => {
      if (!isAdmin && user?._id) {
        fetchUserProperties();
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [isAdmin, user?._id]);

  const fetchUserProperties = async () => {
    if (!user?._id) return;
    try {
      setLoadingProperties(true);
      const res = await propertyService.getUserProperties(user._id);
      console.log('Fetched properties:', res.data); // Debug log
      setUserProperties(res.data.properties || []);
    } catch (error) {
      console.error("Failed to fetch user properties:", error);
      setUserProperties([]);
    } finally {
      setLoadingProperties(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: "warning",
      approved: "success",
      rejected: "danger",
      active: "success",
      inactive: "secondary",
    };
    return <Badge bg={variants[status] || "secondary"}>{status}</Badge>;
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Dashboard</h1>

      <Row>
        <Col md={3} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Welcome</Card.Title>
              <p>
                {user?.firstName} {user?.lastName}
              </p>
              <small className="text-muted">
                Role: {isAdmin ? "Admin" : "User"}
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        {!isAdmin && (
          <>
            <Col md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Browse Properties</Card.Title>
                  <Card.Text>
                    Search and browse rental properties in your favorite
                    locations
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/properties")}
                  >
                    View Properties
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>My Bookings</Card.Title>
                  <Card.Text>
                    View and manage your property bookings and reservations
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/bookings")}
                  >
                    View Bookings
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Post a Property</Card.Title>
                  <Card.Text>
                    List your property and start renting it out
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/post-property")}
                  >
                    Post Property
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={12} className="mb-4">
              <Card>
                <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                  <Card.Title className="mb-0">My Properties</Card.Title>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={fetchUserProperties}
                    disabled={loadingProperties}
                  >
                    {loadingProperties ? 'Refreshing...' : 'Refresh'}
                  </Button>
                </Card.Header>
                <Card.Body>
                  {loadingProperties ? (
                    <p className="text-muted">Loading properties...</p>
                  ) : userProperties.length > 0 ? (
                    <div style={{ overflowX: "auto" }}>
                      <table className="table table-sm mb-0">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Property Name</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userProperties.map((property) => (
                            <tr key={property._id}>
                              <td>
                                <img 
                                  src={property.images?.[0] || 'https://via.placeholder.com/60x40'} 
                                  alt={property.title}
                                  style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/60x40?text=No+Image';
                                  }}
                                />
                              </td>
                              <td className="fw-500">{property.title}</td>
                              <td>
                                <span className="text-capitalize">
                                  {property.propertyType}
                                </span>
                              </td>
                              <td>${property.price}</td>
                              <td>{getStatusBadge(property.status)}</td>
                              <td>
                                <Button
                                  variant="sm"
                                  size="sm"
                                  onClick={() =>
                                    navigate(`/property/${property._id}`)
                                  }
                                >
                                  View
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <Alert variant="info" className="mb-0">
                      You haven't posted any properties yet.{" "}
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => navigate("/post-property")}
                      >
                        Post your first property
                      </Button>
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Messages</Card.Title>
                  <Card.Text>Chat with property owners and renters</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/messages")}
                  >
                    View Messages
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}

        {isAdmin && (
          <>
            <Col md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Pending Properties</Card.Title>
                  <Card.Text>
                    Review and approve pending property listings
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/admin/pending-properties")}
                  >
                    Review Properties
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>User Management</Card.Title>
                  <Card.Text>Manage user accounts and roles</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/admin/users")}
                  >
                    Manage Users
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Statistics</Card.Title>
                  <Card.Text>View platform statistics and analytics</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/admin/statistics")}
                  >
                    View Stats
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Bookings</Card.Title>
                  <Card.Text>View all bookings on the platform</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/admin/bookings")}
                  >
                    View Bookings
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;
